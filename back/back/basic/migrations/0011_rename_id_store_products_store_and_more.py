# Generated by Django 4.1.3 on 2022-12-07 02:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basic', '0010_products_price_sale'),
    ]

    operations = [
        migrations.RenameField(
            model_name='products',
            old_name='id_store',
            new_name='store',
        ),
        migrations.RenameField(
            model_name='users',
            old_name='id_person',
            new_name='person',
        ),
        migrations.RenameField(
            model_name='users',
            old_name='id_role',
            new_name='role',
        ),
        migrations.RenameField(
            model_name='users',
            old_name='id_status',
            new_name='status',
        ),
        migrations.AlterField(
            model_name='products',
            name='url_picture',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='products',
            name='url_product',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='stores',
            name='url_store',
            field=models.CharField(max_length=500),
        ),
    ]