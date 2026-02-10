from rest_framework import serializers
from contacts_app.models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['firstname', 'lastname', 'email', 'phone']