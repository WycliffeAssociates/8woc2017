from django.http import HttpResponse, StreamingHttpResponse
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
import json
from django.core import serializers
import zipfile
#from os import remove
from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, FileUploadParser
from parsers import MP3StreamParser
from .serializers import LanguageSerializer, BookSerializer, UserSerializer
from .serializers import TakeSerializer, CommentSerializer
from .models import Language, Book, User, Take, Comment
import pydub
import time
import uuid
import os
from tinytag import TinyTag
import urllib2
import pickle

class LanguageViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

class BookViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class UserViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TakeViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Take.objects.all()
    serializer_class = TakeSerializer

class CommentViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class ProjectViewSet(views.APIView):
    parser_classes = (JSONParser,)

    def post(self, request):
        data = json.loads(request.body)

        lst = []
        takes = Take.objects.all()
        if "language" in data: takes.filter(language__code=data["language"])
        if "slug" in data: takes.filter(book__code=data["slug"])
        if "chapter" in data: takes.filter(chapter=data["chapter"])
        takes = takes.values()

        for take in takes:
            dic = {}
            # Include language name
            dic["language"] = Language.objects.filter(pk=take["language_id"]).values()[0]
            # Include book name
            dic["book"] = Book.objects.filter(pk=take["book_id"]).values()[0]
            # Include author of file
            dic["user"] = User.objects.filter(pk=take["user_id"]).values()[0]
            
            # Include comments
            dic["comments"] = []
            for cmt in Comment.objects.filter(file=take["id"]).values():
                dic2 = {}
                dic2["comment"] = cmt
                # Include author of comment
                dic2["user"] = User.objects.filter(pk=cmt["user_id"]).values()[0]
                dic["comments"].append(dic2)
            
            # Parse markers
            if take["markers"]:
                take["markers"] = json.loads(take["markers"])
            else:
                take["markers"] = {}
            dic["take"] = take
            lst.append(dic)

        return Response(lst, status=200)

class FileUploadView(views.APIView):
    parser_classes = (FileUploadParser,)
    def post(self, request, filename, format='zip'):
        if request.method == 'POST' and request.data['file']:
            uuid_name = str(time.time()) + str(uuid.uuid4())
            upload = request.data["file"]
            #unzip files
            zip = zipfile.ZipFile(upload)
            file_name = 'media/dump/' + uuid_name
            zip.extractall(file_name)
            zip.close()
            #extract metadata / get the apsolute path to the file to be stored
            
            # Cache langname and langcode to re-use later
            langname = ''
            langcode = ''

            for root, dirs, files in os.walk(file_name):
                for f in files:
                    abpath = os.path.join(root, os.path.basename(f))
                    meta = TinyTag.get(abpath)
                    a = meta.artist
                    lastindex = a.rfind("}") + 1
                    substr = a[:lastindex]
                    pls = json.loads(substr)

                    if langcode != pls['language']:
                        langcode = pls['language']
                        langname = getLanguageByCode(langcode)
                    prepareDataToSave(pls, abpath, langname)
            return Response({"response": "ok"}, status=200)
        else:
            return Response(status=404)

class FileStreamView(views.APIView):
    parser_classes = (MP3StreamParser,)

    def get(self, request, filepath, format='mp3'):
        filepath = "media/saved/" + filepath + ".wav"
        sound = pydub.AudioSegment.from_wav(filepath)
        file = sound.export("audio.mp3", format="mp3")

        return StreamingHttpResponse(file)

def index(request):
    return render(request, 'index.html')

def prepareDataToSave(meta, abpath, langname):
    book, b_created = Book.objects.get_or_create(
        code = meta["slug"],
        defaults={'code': meta['slug'], 'booknum': meta['book_number']},
    )
    language, l_created = Language.objects.get_or_create(
        code = meta["language"],
        defaults={'code': meta['language'], 'name': langname},
    )
    
    take = Take(location=abpath,
                duration = 0,
                book = book,
                language = language,
                rating = 0, checked_level = 0,
                anthology = meta['anthology'],
                version = meta['version'],
                mode = meta['mode'],
                chapter = meta['chapter'],
                startv = meta['startv'],
                endv = meta['endv'],
                markers = meta['markers'])
    take.save()

def getLanguageByCode(code):
    # which URL should we cache?
    url = 'http://td.unfoldingword.org/exports/langnames.json'
    response = urllib2.urlopen(url)
    #obtain jsonfile from webscraping
    webFile = json.loads(response.read())
    
    with open("language.json", "wb") as fp:
        pickle.dump(webFile, fp)
    with open ("language.json", "rb") as fp:
        languages = pickle.load(fp)
    langname = ""
    for dicti in languages:
        if dicti["lc"] == code:
            langname = dicti["ln"]
        break
    
    return langname