from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(MainGoal)
admin.site.register(Milestone)
admin.site.register(Chore)
admin.site.register(DayRecord)