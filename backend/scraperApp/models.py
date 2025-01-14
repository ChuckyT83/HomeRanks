from django.db import models
from django.contrib.auth.models import User
import httpx
from PIL import Image
from io import BytesIO
import asyncio

# Create your models here.

class Home(models.Model):
    address = models.CharField(max_length=200)
    price = models.IntegerField()
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    sqft = models.IntegerField()
    lot_size = models.IntegerField()
    year_built = models.IntegerField()
    days_on_market = models.IntegerField()
    preRating = models.IntegerField(default=0)
    postRating = models.IntegerField(default=0)
    heating = models.CharField(max_length=200)
    cooling = models.CharField(max_length=200)
    appliances = models.CharField(max_length=400)
    basement = models.CharField(max_length=200)
    fireplace = models.CharField(max_length=200)
    status = models.CharField(max_length=1500)
    homeUrl = models.CharField(max_length=300)
    thumbnail = models.ImageField(upload_to='images/homes/', default='images/default.png')

    async def get_thumb(url):
        client = httpx.AsyncClient(http2=True)
        response = await client.get(url)
        thumbnail = Image.open(BytesIO(response.content)).convert("RGB")
        return thumbnail


class HomeList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    homes = models.ManyToManyField(Home, default=None)
    west_cord = models.FloatField(default=0)
    east_cord = models.FloatField(default=0)
    south_cord = models.FloatField(default=0)
    north_cord = models.FloatField(default=0)
    max_price = models.IntegerField(default=0)
    min_beds = models.IntegerField(default=0)
    min_baths = models.IntegerField(default=0)
    min_acres = models.IntegerField(default=0)
    keywords = models.CharField(max_length=200, default="")
