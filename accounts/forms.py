from django import forms
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError


class UserRegistrationForm(forms.ModelForm):

    password1 = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = get_user_model()
        fields = ['username', 'password']

    def clean_password(self):
        value = self.cleaned_data['password']
        print(self.data.get('password1'))
        r_pass = self.data.get('password1')
        if value != r_pass:
            raise ValidationError("Password Dont match")
        return value