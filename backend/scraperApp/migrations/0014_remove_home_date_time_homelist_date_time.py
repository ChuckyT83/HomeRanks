# Generated by Django 5.1.4 on 2025-01-14 05:23

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scraperApp', '0013_home_date_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='home',
            name='date_time',
        ),
        migrations.AddField(
            model_name='homelist',
            name='date_time',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2025, 1, 14, 5, 23, 49, 210171, tzinfo=datetime.timezone.utc)),
            preserve_default=False,
        ),
    ]
