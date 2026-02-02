from rest_framework import serializers
from board_tasks_app.models import Task, BoardSettings

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class BoardSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoardSettings
        fields = '__all__'