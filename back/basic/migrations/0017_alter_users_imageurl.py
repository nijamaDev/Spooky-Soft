# Generated by Django 4.1.4 on 2023-01-13 23:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basic', '0016_alter_users_imageurl'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='imageUrl',
            field=models.CharField(max_length=500, null=True),
        ),
    ]
