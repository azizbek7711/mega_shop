from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.shortcuts import render
from django.views import generic
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView,DeleteView,UpdateView
from django.urls import reverse_lazy
from .models import Article

class HomePageView(generic.TemplateView):
    template_name = 'home.html'

class FavouritesPageView(generic.TemplateView):
    template_name = 'favourites.html'

class CartPageView(generic.TemplateView):
    template_name = 'cart.html'

class ProductPageView(generic.TemplateView):
    template_name = 'product.html'

class CtgPageView(generic.TemplateView):
    template_name = 'ctg.html'

class ProfileAddPageView(generic.TemplateView):
    template_name = 'profile-add.html'

class ProfileRemovePageView(generic.TemplateView):
    template_name = 'profile-remove.html'

class ProfileStatisticsPageView(generic.TemplateView):
    template_name = 'profile-statistics.html'

class ProfileSettingsPageView(generic.TemplateView):
    template_name = 'profile-settings.html'

class ArticleListView(ListView):
    model = Article
    template_name = 'article_list.html'

class ArticleDetailView(DetailView):
    model = Article
    template_name = 'article_detail.html'

class ArticleCreateView(LoginRequiredMixin, UserPassesTestMixin, CreateView):

    model = Article
    template_name = 'article_new.html'
    fields = ('title', 'summary', 'body', 'photo', 'author')

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def test_func(self):
        return self.request.user.isuperuser

class ArticleUpdateView(LoginRequiredMixin,UserPassesTestMixin,UpdateView):
    model = Article
    fields = ('title', 'summary', 'body','photo')
    template_name = 'article_edit.html'

    def test_func(self):
        obj = self.get_object()
        return obj.author == self.request.user

class ArticleDeleteView(LoginRequiredMixin,UserPassesTestMixin,DeleteView):
    model = Article
    template_name = 'article_delete.html'
    success_url = reverse_lazy('article_list')

    def test_func(self):
        obj = self.get_object()
        return obj.author == self.request.user


