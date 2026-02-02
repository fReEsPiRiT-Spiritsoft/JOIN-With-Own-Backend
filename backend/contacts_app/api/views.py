from rest_framework import viewsets
from contacts_app.models import Contact
from .serializers import ContactSerializer
from rest_framework.permissions import IsAuthenticated

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]