# Generated by Django 5.1.7 on 2025-03-10 10:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movies_collection', '0006_alter_movie_genres'),
    ]

    operations = [
        migrations.RenameField(
            model_name='movie',
            old_name='release_year',
            new_name='year',
        ),
    ]
