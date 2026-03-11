# from django.http import HttpResponse 

from django.shortcuts import render 
from .models import Post



# def index(request):
#     return HttpResponse("Hello, World!")

def index(request):
    postsQuerySet = Post.objects.all()
    return render(request, 'index.html', {'posts' : postsQuerySet})