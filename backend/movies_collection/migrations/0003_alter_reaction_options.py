# Generated by Django 5.1.7 on 2025-03-07 16:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movies_collection', '0002_reaction'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='reaction',
            options={'verbose_name': 'Reactions', 'verbose_name_plural': 'Reactions'},
        ),
    ]
