from django.urls import path
from .import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.GetRoutes.as_view()),
    path('notes/', views.getNotes.as_view()),
    path('register/', views.RegisterView.as_view()),
    # path('user/', views.UserView.as_view()),
    # path('login/', views.LoginView.as_view()),
    # path('logout/', views.LogoutView.as_view()),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
