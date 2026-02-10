from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from board_tasks_app.models import Task, BoardSettings
from .serializers import TaskSerializer, BoardSettingsSerializer

class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Task model.
    Provides CRUD operations for tasks.
    All authenticated users can access and manage tasks.

    Supports:
    - Filtering by view mode (public/private)
    - Filtering by owner for private tasks
    - Returns only public tasks by default
    """
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Returns queryset for tasks based on view mode and user.
        - If action is retrieve/update/destroy: returns all tasks.
        - If viewMode=private and userId is set: returns private tasks for user.
        - If viewMode=public: returns all public tasks.
        """
        if self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            return Task.objects.all()
        queryset = Task.objects.all()
        view_mode = self.request.query_params.get('viewMode', 'public')
        user_id = self.request.query_params.get('userId')

        if view_mode == 'private' and user_id:
            return queryset.filter(isPrivate=True, ownerId=user_id)
        if view_mode == 'public':
            return queryset.filter(isPrivate=False)

        return queryset

class BoardSettingsViewSet(viewsets.ModelViewSet):
    """
    ViewSet for BoardSettings model.
    Provides CRUD operations for board settings.
    Each user has their own board settings, identified by userId.
    Only authenticated users can access board settings.
    """
    serializer_class = BoardSettingsSerializer
    permission_classes = [IsAuthenticated]
    queryset = BoardSettings.objects.all()
    lookup_field = 'userId'