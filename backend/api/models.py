from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class MainGoal(models.Model):
    PRIORITY_CHOICES = [
        ("H", "High"),
        ("M", "Medium"),
        ("L", "Low")
    ]
    title = models.CharField(max_length=128)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="goals")
    priority = models.CharField(max_length=1, choices=PRIORITY_CHOICES)

    def __str__(self):
        return f"{self.title}"

class Milestone(models.Model):
    title = models.CharField(max_length=128)
    goal = models.ForeignKey(MainGoal, on_delete=models.CASCADE, related_name="milestones")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="milestones")
    deadline = models.DateField()

    def __str__(self):
        return f"Milestone: {self.title}"

class Chore(models.Model):
    goal = models.ForeignKey(MainGoal, on_delete=models.CASCADE, related_name="chores")
    title = models.CharField(max_length=128)
    milestone = models.ForeignKey(Milestone, on_delete=models.CASCADE, related_name="chores")
    todo_on_date = models.DateField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class DayRecord(models.Model):
    work = models.IntegerField(default=0)
    sleep = models.IntegerField(default=0)
    rest = models.IntegerField(default=0)
    day = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="day_records")

    def __str__(self):
        return f"Slept {self.sleep} hour(s), worked {self.work} hour(s), and rested {self.rest} hour(s)."