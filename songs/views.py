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
from .models import Song
import requests
from .tools.get_audio import get_song

GENERAL = '3pQuUtPiyu4YPKfqWhWilO'
GREG_EDITION = '46mUjJfBD6sCY5WiW6vOog'


URL = f'https://api.spotify.com/v1/playlists/{GENERAL}/tracks?limit=100'
headers = {
    'Authorization': 'Bearer BQAeg9e9EoP9KOTSJjHKwFulUDGtPPfvziY6oUkX15ZOhe0pjEL-kBaHRaLb6KzAZI0FjIZ_MaWRtEoMGGQCysZrbr0t8xgY255ycShPDeDjmaERO-MRrEaIcUkDt1cgAaJMXi8Nn6qH-uRXvgm0l0XPn-_rUKQew__IzWFs84ZP7YIQBDOFOC0fg6oQaDw'}


# Create your views here.

def populate_db(req):
    print('hey there')
    
    with open('/Users/pinya/Desktop/PORTFOLIO PROJECTS/SongPopCopycat/songs/tools/song_previews.txt', encoding='utf-8') as file:
        songs = file.readlines()
        print(songs)
        for line in songs:
            song_info_raw = line.strip()
            song_info = song_info_raw.split('|')
            artist_slug = song_info[1].lower().replace(" ", "_")
            print(artist_slug)
            try:

                s = Song.objects.create(title=song_info[0], artist=song_info[1], album=song_info[2],
                                        preview_url=song_info[3], artist_slug=artist_slug)
                s.save()
                print(song_info[0])
            except Exception as e:
                print(e)
    return render(req, "populate_db.html", {"result": "all done"})

def populate_db_fromspot(req):
    all_songs = []
    for i in range(7):

        req = requests.get(
            f'https://api.spotify.com/v1/playlists/{GENERAL}/tracks?limit=100&offset={i * 100}',
            headers=headers)

        result = req.json()['items']

        for song in result:
            song_dict = dict()
            song_title = song['track']['name']
            artist = song['track']['artists'][0]['name']
            album = song['track']['album']['name']
            query = f"{song_title} {artist}"
            song_prev = get_song(query)
            song_dict['name'] = song_title
            song_dict['artist'] = artist
            song_dict['album'] = album
            song_dict['preview'] = song_prev
            artist_slug = artist.lower().replace(" ", "-")
            song_dict['slug'] = artist_slug
            all_songs.append(song_dict)


    for line in all_songs:
        try:
            s = Song.objects.create(title=line.get('name'), artist=line.get('artist'), album = line.get('album'), preview_url=line.get('preview'), artist_slug = line.get('slug'))
            s.save()
        except Exception:
            pass
    return render(req, "populate_db.html", {"result": "all done"})


def set_songs(req):
    songs = get_all_songs()
    for line in songs:

        slug = slugify(line['artist'])
        try:
            s = Song.objects.create(title=line['name'], artist=line['artist'], album=line['album'],
                                    preview_url=line['preview'], artist_slug=slug)
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

    return render(req, 'home.html', {'correct': correct_answer, 'song_titles': song_titles})


def view_all(req):
    songs = Song.objects.all()

    return render(req, 'all_songs.html', {'songs': songs})


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer


@api_view(['GET'])
def picked_songs(req):
    songs = Song.objects.all()
    correct_answer = random.choice(songs)
    correct = {'title': correct_answer.title, "artist": correct_answer.artist,
               "preview_url": correct_answer.preview_url}
    others = random.choices(songs, k=3)
    song_titles = [correct_answer.title]
    for s in others:
        song_titles.append(s.title)
    random.shuffle(song_titles)
    final = {'correct': correct, "all_songs": song_titles}
    return Response(final)


@api_view(['GET'])
def get_playlist(req, artist=''):
    if artist == '':
        playlists = Playlist.objects.all()
        serializer = PlaylistSerializer(playlists, many=True)
        return Response(serializer.data)
    else:
        playlist = Playlist.objects.get(slug_field=artist)
        final_result = {'name':playlist.title, 'cover_img': playlist.cover_image}
        return Response(final_result)


# GENERATE A SET OF SONGS BY A SPECIFIC ARTIST
@api_view(['GET'])
def playlist_songs(req, artist=''):
    if artist == '':
        songs = Song.objects.all()
    else:
        songs = Song.objects.all().filter(artist_slug=artist)
    correct_answer = random.choice(songs)
    correct = {'title': correct_answer.title, "artist": correct_answer.artist,
               "preview_url": correct_answer.preview_url}
    song_titles = [correct_answer.title]
    while len(song_titles) < 4:
        random_song = random.choice(songs)
        if random_song.title not in song_titles:
            song_titles.append(random_song.title)
    random.shuffle(song_titles)
    playlist = Playlist.objects.get(slug_field=artist)
    final = {'correct': correct, "all_songs": song_titles, 'name':playlist.title, 'cover_img': playlist.cover_image}
    return Response(final)


class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()
