from django.db import models 
# from datetime import datetime

class Post(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    publication_date = models.DateTimeField(auto_now_add=True, null=True)
    tag = models.CharField(max_length=50, null=True)
    slug = models.SlugField(unique=True)

    def is_before_covid(self):
        return self.publication_date < datetime(2020, 3, 10)