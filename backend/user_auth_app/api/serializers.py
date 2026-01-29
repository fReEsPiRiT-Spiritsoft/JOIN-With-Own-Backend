from rest_framework import serializers
from ..models import User

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
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['confirmPassword']:
            raise serializers.ValidationError("Passwords do not Match")
        if not data.get('acceptPrivacyPolicy'):
            raise serializers.ValidationError("Privacy Policy must be accepted")
        return data
    

    def create(seld, validated_data):
        validated_data.pop('confirmPassword')
        validated_data.pop('acceptPrivacyPolicy')
        user = User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password']
        )
        return user
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
