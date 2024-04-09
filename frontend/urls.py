from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('test', views.details, name="test"),
    path('details/<int:id>/', views.home, name="details"),
]