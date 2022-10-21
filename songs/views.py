import random

from django.shortcuts import render
from .models import Song, Playlist
from rest_framework import viewsets
from .serializers import SongSerializer, PlaylistSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.template.defaultfilters import slugify
from .tools.playlist_parser import get_all_songs
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os
import json
# Create your views here.
def set_songs(req):
    songs = get_all_songs()
    for line in songs:

        slug = slugify(line['artist'])
        try:
            s = Song.objects.create(title=line['name'], artist=line['artist'], album = line['album'], preview_url=line['preview'], artist_slug=slug)
            s.save()
        except Exception:
            print('error')

    return render(req, 'home.html')



def home(req):
    songs = Song.objects.all()
    print(songs)
    correct_answer = random.choice(songs)
    others = random.choices(songs, k=3)
    song_titles = [correct_answer.title]
    for s in others:
        song_titles.append(s.title)

    random.shuffle(song_titles)
    print(song_titles)


    return render(req, 'home.html', {'correct':correct_answer, 'song_titles':song_titles})



def view_all(req):
    songs = Song.objects.all()

    return render(req, 'all_songs.html', {'songs':songs})

class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer



@api_view(['GET'])
def picked_songs(req):
    songs = Song.objects.all()
    correct_answer = random.choice(songs)
    correct = {'title': correct_answer.title, "artist": correct_answer.artist, "preview_url":correct_answer.preview_url}
    others = random.choices(songs, k=3)
    song_titles = [correct_answer.title]
    for s in others:
        song_titles.append(s.title)
    random.shuffle(song_titles)
    final = {'correct': correct, "all_songs": song_titles}
    return Response(final)


@api_view(['GET'])
def get_playlist(req):
    playlists = Playlist.objects.all()
    serializer = PlaylistSerializer(playlists, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def playlist_songs(req, artist=''):
    if artist == '':
        songs = Song.objects.all()
    else:
        songs = Song.objects.all().filter(artist_slug=artist)
    correct_answer = random.choice(songs)
    correct = {'title': correct_answer.title, "artist": correct_answer.artist, "preview_url":correct_answer.preview_url}
    song_titles = [correct_answer.title]
    while len(song_titles) < 4:
        random_song = random.choice(songs)
        if random_song.title not in song_titles:
            song_titles.append(random_song.title)
    random.shuffle(song_titles)
    final = {'correct': correct, "all_songs": song_titles}
    return Response(final)


class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()