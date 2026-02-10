from rest_framework import serializers
from contacts_app.models import Contact

class ContactSerializer(serializers.ModelSerializer):
    """Serializer for Contact model.
    Serializes and deserializes Contact instances for API requests and responses.
    """
    class Meta:
        model = Contact
        fields = ['firstname', 'lastname', 'email', 'phone']