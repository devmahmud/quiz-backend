"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django import urls
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.documentation import include_docs_urls
from django.views.generic import TemplateView

urlpatterns = [
    path('api/v1/', include('quiz.urls')),
    path('admin/', admin.site.urls),
    path('docs/', include_docs_urls(title='Explore The City API')),
    path('api/v1/account/', include('accounts.urls')),
    path('api/v1/password_reset/',
         include('django_rest_passwordreset.urls', namespace='password_reset')),
    path("", TemplateView.as_view(template_name='index.html')),
]
