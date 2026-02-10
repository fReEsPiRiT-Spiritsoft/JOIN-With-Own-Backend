from rest_framework import viewsets
from contacts_app.models import Contact
from .serializers import ContactSerializer
from rest_framework.permissions import IsAuthenticated

class ContactViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Contact model.
    Provides CRUD operations for contacts.

    - Only authenticated users can access and manage contacts.
    - Uses ContactSerializer for serialization.
    - Returns all contact entries in the system.
    """
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]