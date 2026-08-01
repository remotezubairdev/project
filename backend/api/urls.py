from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views
from django.urls import include

urlpatterns = [
    path("api-auth/", include("rest_framework.urls")),
    path("token", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("register", views.CreateUserView.as_view(), name="register"),
    path("goals", views.ListCreateMainGoalView.as_view(), name="goals"),
    path("goals/<int:pk>", views.RetrieveMainGoalView.as_view(), name="goal"),
    path("user", views.RetrieveUserView.as_view(), name="user"),
    path("milestones", views.ListCreateMilestoneView.as_view(), name="milestones"),
    path("milestones/<int:pk>", views.RetrieveMilestoneView.as_view(), name="milestone"),
    path("chores", views.ListCreateChoreView.as_view(), name="chores"),
    path("chores/<int:pk>", views.RetrieveChoreView.as_view(), name="chore"),
    path("day-record", views.DayRecordView.as_view(), name="day-record")
]