# https://www.chrisjmendez.com/2017/06/19/working-with-itunes-affiliate-resources/
# https://tools.applemediaservices.com/song/1440943585?country=us
#  send a request here https://tools.applemediaservices.com/
import time
import requests

API_BASE = 'https://itunes.apple.com/search?'

def plusify(phrase):
    phrase_list = phrase.split(' ')
    plussified = "+".join(phrase_list)
    return plussified

def get_song(song_name):
    time.sleep(2)
    req = requests.get(API_BASE, params={'media':'music', 'term':song_name, 'entity':'song', 'limit':1})
    try:
        results = req.json()['results'][0]
        return results['previewUrl']
    except:
        print(f"{song_name} FAILED")
        return 'NONE'