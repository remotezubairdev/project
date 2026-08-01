from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User
from .models import *
from .serializers import *
from datetime import date

from rest_framework.permissions import IsAuthenticated

# Create your views here.

class DayRecordView(generics.ListCreateAPIView):
     queryset = DayRecord.objects.all()
     serializer_class = DayRecordSerializer

     def get_queryset(self):
          today = self.request.query_params.get("today")
          week = self.request.query_params.get("week")
          if today:
               return DayRecord.objects.filter(day=date.today(),user=self.request.user)
          if week:
               return DayRecord.objects.filter(day__week=date.strftime("%W"))
          return DayRecord.objects.filter(user=self.request.user)

     def perform_create(self, serializer):
            serializer.save(user=self.request.user)

class RetrieveChoreView(generics.RetrieveUpdateDestroyAPIView):
     queryset = Chore.objects.all()
     serializer_class = ChoreSerializer

     def get_object(self):
          return Chore.objects.get(pk=self.kwargs['pk'], milestone__user=self.request.user)

class ListCreateChoreView(generics.ListCreateAPIView):
     queryset = Chore.objects.all()
     serializer_class = ChoreSerializer

     def get_queryset(self):
         return Chore.objects.filter(milestone__user=self.request.user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RetrieveMilestoneView(generics.RetrieveUpdateDestroyAPIView):
     serializer_class = SimpleMilestoneSerializer

     def get_queryset(self):
          return Milestone.objects.filter(user=self.request.user)

class ListCreateMilestoneView(generics.ListCreateAPIView):
    queryset = Milestone.objects.all()
    serializer_class = MilestoneSerializer

    def get_queryset(self):
        queryset = Milestone.objects.filter(user=self.request.user)

        goal = self.request.query_params.get('goal')
        if goal:
            queryset = queryset.filter(goal=goal)
        return queryset
     
    def perform_create(self, serializer):
            serializer.save(user=self.request.user)
          

class ListCreateMainGoalView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = MainGoal.objects.all()
    serializer_class = MainGoalSerializer

    def get_queryset(self):
        return MainGoal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
            serializer.save(user=self.request.user)

class RetrieveMainGoalView(generics.RetrieveUpdateDestroyAPIView):
     serializer_class = MainGoalSerializerWithMilestones

     def get_queryset(self):
          return MainGoal.objects.filter(user=self.request.user)

class RetrieveUserView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user