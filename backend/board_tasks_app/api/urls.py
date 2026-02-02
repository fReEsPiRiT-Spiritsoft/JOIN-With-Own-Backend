from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, BoardSettingsViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='tasks')
router.register(r'board-settings', BoardSettingsViewSet, basename='board-settings')

urlpatterns = [
    path('', include(router.urls)),
]