from rest_framework import serializers
from board_tasks_app.models import Task, BoardSettings

class TaskSerializer(serializers.ModelSerializer):
    """
    Serializer for Task model.
    Serializes and deserializes Task instances for API requests and responses.
    """
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
    """
    Serializer for BoardSettings model.
    Serializes and deserializes BoardSettings instances for API requests and responses.
    """
    class Meta:
        model = BoardSettings
        fields = [
            'userId',
            'viewMode',
            'lastChanged'
        ]