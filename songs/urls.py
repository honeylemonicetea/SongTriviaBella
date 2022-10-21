from django.contrib import admin
from django.urls import path, include
from .views import home, SongViewSet, view_all, picked_songs, get_playlist, playlist_songs, set_songs
from rest_framework import routers

router = routers.DefaultRouter()
router.register('songs', SongViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('home/', home, name='home'),
    path('set_songs/', set_songs, name='set'),

    path('songs/', include('rest_framework.urls', namespace='rest_framework')),
    path('generate/', playlist_songs, name='picked'),
    path('generate/<str:artist>', playlist_songs, name='picked'),
    path('playlists/', get_playlist, name='playlists'),

    # path('generate/test/<str:artist>', playlist_songs, name='picked'),
]
