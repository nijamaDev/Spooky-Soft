# Generated by Django 4.1.4 on 2023-01-16 19:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('basic', '0021_alter_productregisters_redirect_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='store',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='basic.stores'),
        ),
    ]
