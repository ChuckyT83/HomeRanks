# Generated by Django 5.1.4 on 2025-01-15 19:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scraperApp', '0021_home_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='APIKeys',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('key', models.CharField(max_length=2000)),
            ],
        ),
    ]
