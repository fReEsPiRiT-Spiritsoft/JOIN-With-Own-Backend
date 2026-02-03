from rest_framework import serializers
from ..models import User
from contacts_app.models import Contact

class UserSerializer(serializers.ModelSerializer):
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'createdAt']

class RegisterSerializer(serializers.ModelSerializer):
    confirmPassword = serializers.CharField(write_only=True)
    acceptPrivacyPolicy = serializers.BooleanField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'confirmPassword', 'acceptPrivacyPolicy']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['confirmPassword']:
            raise serializers.ValidationError('Passwords do not match')
        if not data['acceptPrivacyPolicy']:
            raise serializers.ValidationError('Privacy policy must be accepted')
        return data

    def create(self, validated_data):
        validated_data.pop('confirmPassword', None)
        validated_data.pop('acceptPrivacyPolicy', None)
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        name_parts = (user.name or '').strip().split(' ', 1)
        firstname = name_parts[0] if name_parts else ''
        lastname = name_parts[1] if len(name_parts) > 1 else ''
        Contact.objects.create(
            firstname=firstname,
            lastname=lastname,
            email=user.email,
            phone=''
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)