# Generated by Django 4.1.4 on 2023-01-16 02:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basic', '0019_rename_url_picture_products_cover_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productregisters',
            name='redirect',
            field=models.IntegerField(max_length=100),
        ),
        migrations.AlterField(
            model_name='productregisters',
            name='visits',
            field=models.IntegerField(max_length=100),
        ),
    ]
