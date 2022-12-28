import requests
from .get_audio import get_song
# from .models import Song

GENERAL = '3pQuUtPiyu4YPKfqWhWilO'
GREG_EDITION = '46mUjJfBD6sCY5WiW6vOog'


URL = f'https://api.spotify.com/v1/playlists/{GENERAL}/tracks?limit=100'
headers = {
    'Authorization': 'Bearer BQAeg9e9EoP9KOTSJjHKwFulUDGtPPfvziY6oUkX15ZOhe0pjEL-kBaHRaLb6KzAZI0FjIZ_MaWRtEoMGGQCysZrbr0t8xgY255ycShPDeDjmaERO-MRrEaIcUkDt1cgAaJMXi8Nn6qH-uRXvgm0l0XPn-_rUKQew__IzWFs84ZP7YIQBDOFOC0fg6oQaDw'}


def get_all_songs():
    all_songs = []
    for i in range(7):

        req = requests.get(
            f'https://api.spotify.com/v1/playlists/{GENERAL}/tracks?limit=100&offset={i * 100}',
            headers=headers)
        print(req.status_code)
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


    # for line in all_songs:
    #     s = Song.objects.create(title=line.get('name'), artist=line.get('artist'), album = line.get('album'), preview_url=line.get('preview'), artist_slug = line.get('slug'))
    #     s.save()
