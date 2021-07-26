from django.shortcuts import render


def home(request, *args, **kwargs):

    return render(request, 'list.html')


def details(request, *args, **kwargs):

    return render(request, 'pages/details.html')