# Generated by Django 5.1.4 on 2025-01-10 01:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scraperApp', '0007_alter_home_homeurl'),
    ]

    operations = [
        migrations.AddField(
            model_name='homelist',
            name='keywords',
            field=models.CharField(default='', max_length=200),
        ),
    ]
