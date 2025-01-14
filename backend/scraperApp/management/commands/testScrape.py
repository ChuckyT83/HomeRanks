from django.core.management.base import BaseCommand 
from scripts.zillowScraper import homeURLs, run
import asyncio


class Command(BaseCommand):
    help = 'Runs a test scrape on Zillow'

    def handle(self, *args, **options):
        asyncio.run(run(homeURLs))