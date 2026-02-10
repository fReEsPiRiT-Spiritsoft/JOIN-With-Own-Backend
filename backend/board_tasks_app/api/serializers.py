from rest_framework import serializers
from board_tasks_app.models import Task, BoardSettings

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'title',
            'description',
            'dueDate',
            'priority',
            'category',
            'status',
            'assignedTo',
            'subtasks',
            'createdAt',
            'updatedAt',
            'order',
            'isPrivate',
            'ownerId'
        ]

class BoardSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoardSettings
        fields = [
            'userId',
            'viewMode',
            'lastChanged'
        ]