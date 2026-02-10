from django.db import models

class Task(models.Model):
    """
    Task model.
    Represents a task in the board system.
    """
    STATUS_CHOICES = [
        ('todo', 'To do'),
        ('inprogress', 'In progress'),
        ('awaitfeedback', 'Await feedback'),
        ('done', 'Done'),
    ]

    PRIORITY_CHOICES = [
        ('urgent', 'Urgent'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    dueDate = models.CharField(max_length=50) 
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    category = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='todo')

    assignedTo = models.JSONField(default=list) 
    subtasks = models.JSONField(default=list)  

    createdAt = models.CharField(max_length=50)
    updatedAt = models.CharField(max_length=50, blank=True, null=True)

    order = models.IntegerField(blank=True, null=True)
    isPrivate = models.BooleanField(default=False)
    ownerId = models.CharField(max_length=100, blank=True, null=True)

class BoardSettings(models.Model):
    """
    BoardSettings model.    
    Stores board settings for each user.
    """
    userId = models.CharField(max_length=100, unique=True)
    viewMode = models.CharField(max_length=10, default='public')
    lastChanged = models.CharField(max_length=50, blank=True, null=True)