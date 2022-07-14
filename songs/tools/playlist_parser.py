import requests
from .get_audio import get_song

URL = 'https://api.spotify.com/v1/playlists/0RGnFMea6kT6T2osSiKSEK/tracks?limit=100'
headers = {
    'Authorization': 'Bearer BQDnx7UoJWwcTa9rLlkvcynpfGqmVX7px5mJC7WF9AmouwwnbuTNe6_hYyalyq_Qxdlq4J181pkNrUWkvK1LrouO_swiNKDkRSgPqHKtLcG8ONc9cKTRnd6-Qlntm4jMMVIAZsC--dnSFcI6CfMksfjj-tEmT-OinwPaFxuiOXPf_DRrdTGXhebEWcio57s'}


def get_all_songs():
    all_songs = []
    for i in range(7):

        req = requests.get(
            f'https://api.spotify.com/v1/playlists/0RGnFMea6kT6T2osSiKSEK/tracks?limit=100&offset={i * 100}',
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

            all_songs.append(song_dict)

    return all_songs
