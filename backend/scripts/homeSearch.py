import json
import httpx
import scripts.homeScraper as scrape
import asyncio

max_price = 350000
min_beds = 3
min_baths = 1.5
min_acres = 1
min_acres = min_acres * 43560
url_array = []
westCord = -85.80897891162519
eastCord = -85.32518967861455
southCord = 40.40575538131509
northCord = 40.648096038174735

BASE_HEADERS = {
    'authority': 'www.zillow.com',
    'accept': '*/*',
    'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
    'content-type': 'application/json',
    'origin': 'https://www.zillow.com',
    'referer': 'https://www.zillow.com/',
    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
}


url = "https://www.zillow.com/async-create-search-page-state"
body = {
    "searchQueryState": {
        "pagination": {},
        "usersSearchTerm": "Marion, IN",
        "mapBounds": {
            "west": westCord,
            "east": eastCord,
            "south": southCord,
            "north": northCord,
        },
        "filterState":
        {"beds": {"min": min_beds},
        "baths": {"min": min_baths},
        "lot": {"min": min_acres},
        "price": {"max": max_price},},
    },
    "wants": {"cat1": ["listResults", "mapResults"], "cat2": ["total"]},
    "requestId": 2,
}

def scrape_search(url, body):
    response = httpx.put(url, headers=BASE_HEADERS, data=json.dumps(body))
    assert response.status_code == 200, "Failed to fetch page: Blocked"
    data = response.json()
    results = response.json()["cat1"]["searchResults"]["mapResults"]
    print(json.dumps(results, indent=2))
    print(f"Found: {len(results)} properties")
    for homeURL in results:
        url_array.append("https://www.zillow.com" + homeURL["detailUrl"])
    print(url_array)
    return url_array

if __name__ == "__main__":
    scrape_search(url, body)
    asyncio.run(scrape.run(url_array))

