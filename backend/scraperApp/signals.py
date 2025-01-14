from django.db.models.signals import post_save
from .models import Home, HomeList
from django.dispatch import receiver
from scripts import homeScraper, homeSearch
import asyncio
import platform
from asgiref.sync import sync_to_async
import copy


@receiver(post_save, sender=HomeList)
def update_home_list(sender, instance, created, **kwargs):
    if created:
        if platform.system()=='Windows':
            asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
        user=instance.user
        # global user_id
        user_id = user.id
        print("------", str(user_id))
        body = homeSearch.populate_home_search(user)
        urls = homeSearch.get_urls(body)

        print("----", urls, "from signals")
        print("----", str(user)), "from signals"
        asyncio.run(homeScraper.run(user_id, urls))
        print("HomeList updated")
        return

@receiver(post_save, sender=Home)
def add_home_to_homelist(sender, instance, **kwargs):
    homelist = HomeList.objects.filter(user=instance.user).latest('date_time')
    homelist.homes.add(instance)
    print(f"{instance.address} added to HomeList")
    return
    