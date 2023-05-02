from django.urls import path
from .views import *
urlpatterns = [
    path('', HomePageView.as_view(), name="home"),
    path('favourites/', FavouritesPageView.as_view(), name="favourites"),
    path('cart/', CartPageView.as_view(), name="cart"),
    path('product/', ProductPageView.as_view(), name="product"),
    path('categories/', CtgPageView.as_view(), name="ctg"),
    path('profile-add/', ProfileAddPageView.as_view(), name="profile-add"),
    path('profile-remove/', ProfileRemovePageView.as_view(), name="profile-remove"),
    path('profile-statistics/', ProfileStatisticsPageView.as_view(), name="profile-statistics"),
    path('profile-settings/', ProfileSettingsPageView.as_view(), name="profile-settings"),
    path('new/',ArticleCreateView.as_view(), name='article_new' ),
    path('<int:pk>/',ArticleDetailView.as_view(),name = 'article_detail'),
    path('list/',ArticleListView.as_view(), name = 'article_list'),
    path('<int:pk>/delete/',  ArticleDeleteView.as_view(), name = 'article_delete'),
    path('<int:pk>/edit/', ArticleUpdateView.as_view(), name= 'article_edit'),
]
