from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from board_tasks_app.models import Task, BoardSettings
from .serializers import TaskSerializer, BoardSettingsSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Task.objects.all()
        view_mode = self.request.query_params.get('viewMode', 'public')
        user_id = self.request.query_params.get('userId')

        if view_mode == 'private' and user_id:
            return queryset.filter(isPrivate=True, ownerId=user_id)
        if view_mode == 'public' and user_id:
            return queryset.filter(isPrivate=False)

        return queryset

class BoardSettingsViewSet(viewsets.ModelViewSet):
    serializer_class = BoardSettingsSerializer
    permission_classes = [IsAuthenticated]
    queryset = BoardSettings.objects.all()
    lookup_field = 'userId'