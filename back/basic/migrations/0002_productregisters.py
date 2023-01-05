# Generated by Django 4.1.2 on 2023-01-05 04:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('basic', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductRegisters',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('visits', models.FloatField(max_length=100)),
                ('redirect', models.FloatField(max_length=100)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='basic.products')),
            ],
        ),
    ]
