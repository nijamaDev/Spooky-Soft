# Generated by Django 4.1.3 on 2022-11-25 01:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('basic', '0007_alter_status_active'),
    ]

    operations = [
        migrations.RenameField(
            model_name='status',
            old_name='active',
            new_name='name',
        ),
    ]