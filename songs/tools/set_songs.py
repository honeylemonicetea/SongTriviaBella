from models import Song
with open('song_l_previews.txt', encoding='utf-8') as file:
    songs = file.readline()
    for line in songs:
        song_info_raw = line.strip()
        song_info = song_info_raw.split('|')
        s = Song.objects.create(title=song_info[0], artist=song_info[1], album = song_info[2], preview_url=song_info[3])
        s.save()
