from django.contrib import admin
from .models import Task, BoardSettings

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'isPrivate', 'ownerId')
    search_fields = ('title', 'ownerId')
    list_filter = ('isPrivate',)
    class Meta:
        verbose_name = "Task"
        verbose_name_plural = "Tasks"

    def __str__(self):
        return self.title
    
    
@admin.register(BoardSettings)
class BoardSettingsAdmin(admin.ModelAdmin):
    list_display = ('id', 'userId')
    search_fields = ('userId',)