from django.db import models



# Create your models here.
class Song(models.Model):
    title = models.CharField(max_length=200, unique=True)
    artist = models.CharField(max_length=200)
    album = models.CharField(max_length=300, default='')
    preview_url = models.URLField()
    artist_slug = models.SlugField(blank=True)

    def __str__(self):
        return f'{self.title} - {self.artist}'


    class Meta:
        ordering = ['title']


class Playlist(models.Model):
    title = models.CharField(max_length=100)
    cover_image = models.URLField()
    slug_field = models.SlugField(unique=True)

    def __str__(self):
        return self.title

