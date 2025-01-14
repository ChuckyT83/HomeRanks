import asyncio
from typing import List
import httpx
import json
from parsel import Selector
from scraperApp.serializers import HomeSerializer
from scraperApp.models import Home
from django.core.files import File
from io import BytesIO, StringIO
from django.core.files.base import ContentFile




homeURLs = ['https://www.zillow.com/homedetails/3944-N-500-W-Marion-IN-46952/80713497_zpid/', 'https://www.zillow.com/homedetails/4480-N-100-E-Marion-IN-46952/80711054_zpid/', 'https://www.zillow.com/homedetails/1075-E-Bocock-Rd-Marion-IN-46952/80711220_zpid/', 'https://www.zillow.com/homedetails/490-E-Harreld-Rd-Marion-IN-46952/80711387_zpid/', 'https://www.zillow.com/homedetails/3462-E-450th-Rd-N-Marion-IN-46952/443253654_zpid/', 'https://www.zillow.com/homedetails/705-E-North-H-St-Gas-City-IN-46933/80721632_zpid/', 'https://www.zillow.com/homedetails/125-N-Kiley-Dr-Marion-IN-46952/80728231_zpid/', 'https://www.zillow.com/homedetails/10139-E-200-N-Van-Buren-IN-46991/214193356_zpid/']

client = httpx.AsyncClient(
    http2 = True,
    headers={
        "accept-language": "en-US,en;q=0.9",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9",
        "accept-encoding": "gzip, deflate, br",
    },
)

async def scrape_zillow(urls: List[str]):
    #Scrape Zillow for property data
    to_scrape = [client.get(url) for url in urls]
    results = []
    for response in asyncio.as_completed(to_scrape):
        response = await response
        print(response.status_code)
        assert response.status_code == 200, "Failed to fetch page: Blocked"
        selector = Selector(response.text)
        data = selector.css("script#__NEXT_DATA__::text").get()
        if data:
            data = json.loads(data)
            property_data = json.loads(data["props"]["pageProps"]["componentProps"]["gdpClientCache"])
            property_data = property_data[list(property_data)[0]]["property"]
        else:
            data = selector.css("script#hdpApolloPreloadedData::text").get()
            data = json.loads(json.loads(data)["apiCache"])
            property_data = next(
                v["property"] for k, v in data.items() if "ForSale" in k
            )
        results.append(property_data)
    return results

def convert_thumb(thumb):
    #Convert thumbnail to a format that can be saved
    img_io = BytesIO()
    thumb.save(img_io, format="JPEG")
    thumb_converted = ContentFile(img_io.getvalue(), name="home.jpg")
    return thumb_converted


async def run(homes):
    count = 0
    data = await scrape_zillow(homes)
    loop = asyncio.get_running_loop()
    for home in data:
        thumb_url = str(home["desktopWebHdpImageLink"])
        thumb = await Home.get_thumb(thumb_url)
        thumb = convert_thumb(thumb)
        print(type(thumb))
        serializer = HomeSerializer(
            data={
            "address": f"{home['address']['streetAddress']}, {home ['address']['city']}, {home['address']['state']} {home['address']['zipcode']}",

            "price": int(home['price']),
            "sqft": int(home['livingArea']),
            "year_built": int(home['resoFacts']['yearBuilt']),
            "days_on_market": int(home['daysOnZillow']),
            "lot_size": home['lotSize'],
            "bedrooms": home['resoFacts']['bedrooms'],
            "bathrooms": home['resoFacts']['bathrooms'],
            "heating": f"{home['resoFacts']['heating']}",
            "appliances": f"{home['resoFacts']['appliances']}",
            "cooling": f"{home['resoFacts']['cooling']}",
            "basement": f"{home['resoFacts']['basement']}",
            "fireplace": f"{home['resoFacts']['fireplaceFeatures']}",
            "status": f"{home['attributionInfo']['trueStatus']}",
            "homeUrl": homes[count],
            "preRating": 10,
            "thumbnail": thumb})
        if serializer.is_valid():
            print(serializer.errors)                
            await loop.run_in_executor(None, serializer.save)
        else:
            print(serializer.errors)   
        count += 1

    with open("data.json", "w") as f:
        json.dump(data, f, indent=2)


if __name__ == "__main__":
    asyncio.run(run(homeURLs))

        