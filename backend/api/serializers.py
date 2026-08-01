from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class DayRecordSerializer(serializers.ModelSerializer):
    score = serializers.SerializerMethodField()
    class Meta:
        model = DayRecord
        fields = ['id', 'work', 'sleep', 'rest', 'day', 'score']

    def get_score(self, obj):
        # This formula was written using an AI model
        # To create a good formula to calculate the productivity score
        work_score = min(obj.work / 8, 1)
        sleep_score = max(0, 1 - abs(obj.sleep - 8) / 4)
        rest_score = max(0, 1 - abs(obj.rest - 4) / 4)
        productivity = 100 * (
            0.5 * work_score +
            0.3 * sleep_score +
            0.2 * rest_score
        )
        return round(productivity, 2)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {"password": { "write_only": True }}
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class MainGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainGoal
        fields = ['id', 'priority', 'title']
        extra_kwargs = {"id": {"read_only": True}}



class MilestoneSerializer(serializers.ModelSerializer):
    # this goal field is to show the goal's actual values
    # instead of just a foreign key -->
    goal = MainGoalSerializer(read_only=True)
    # This field was written using AI
    # I wanted to make sure that when I create a milestone,
    # I only need to send the goal id instead of the entire object
    # This was django REST framework's way to represent that id
    goal_id = serializers.PrimaryKeyRelatedField(
        queryset=MainGoal.objects.all(),
        source="goal",
        write_only=True
    )
    progress = serializers.SerializerMethodField()
    class Meta:
        model = Milestone
        fields = ['goal_id', 'id', 'title', 'goal', 'user', 'deadline', 'progress']
        extra_kwargs = {"id": {"read_only": True}, "user": {"read_only": True}}

    def get_progress(self, obj):
            total_chores = Chore.objects.filter(milestone=obj).count()
            if total_chores == 0:
                return 0
            completed_chores = Chore.objects.filter(completed=True, milestone=obj).count()
    
            return round((completed_chores / total_chores) * 100, 0)


class ChoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chore
        fields = '__all__'

class SimpleMilestoneSerializer(serializers.ModelSerializer):
    chores = ChoreSerializer(many=True, read_only=True)
    goal = serializers.StringRelatedField()
    progress= serializers.SerializerMethodField()
    class Meta:
        model = Milestone
        fields = ['id', 'title', 'goal', 'progress', 'user', 'deadline', 'chores']

    def get_progress(self, obj):
        total_chores = Chore.objects.filter(milestone=obj).count()
        if total_chores == 0:
            return 0
        completed_chores = Chore.objects.filter(completed=True, milestone=obj).count()

        return round((completed_chores / total_chores) * 100, 0)

class MainGoalSerializerWithMilestones(serializers.ModelSerializer):
    milestones = MilestoneSerializer(many=True, read_only=True)
    chores = ChoreSerializer(many=True, read_only=True)
    class Meta:
        model = MainGoal
        fields = ['id', 'priority', 'title', 'milestones', 'chores']