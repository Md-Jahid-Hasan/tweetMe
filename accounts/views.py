from django.shortcuts import render, redirect
from django.contrib.auth import login, logout

from .forms import UserRegistrationForm


def register_view(request):
    form = UserRegistrationForm(request.POST or None)
    if form.is_valid():
        user = form.save(commit=True)
        user.set_password(form.cleaned_data.get('password'))
        login(request, user)
        return redirect("home")
    context = {
        'form': form
    }
    return render(request, 'accounts/register.html', context)


def login_view(request):
    return render(request)
