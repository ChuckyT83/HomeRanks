from django.core.management.base import BaseCommand 
from scripts.homeScraper import homeURLs, run
from django.contrib.auth.models import User
import asyncio


class Command(BaseCommand):
    help = 'Runs a test scrape on Zillow'

    def handle(self, *args, **options):
        user = User.objects.get(username='admin')
        asyncio.run(run(homeURLs, user))