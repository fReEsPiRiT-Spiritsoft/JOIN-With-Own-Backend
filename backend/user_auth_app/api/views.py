from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from ..models import User

class RegistrationView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(email=response.data['email'])
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'message': 'Registration successful',
            'token': token.key,
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            email=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'message': 'Login successful',
                'token': token.key,
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)

        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
class GuestLoginView(APIView):
    def post(self, request):
        guest_user, created = User.objects.get_or_create(
            email='guest@example.com',
            defaults={'name': 'Guest User'}
        )
        if created:
            guest_user.set_password(None) 
            guest_user.save()

        token, _ = Token.objects.get_or_create(user=guest_user)
        return Response({
            'message': 'Guest login successful',
            'token': token.key,
            'user': UserSerializer(guest_user).data
        }, status=status.HTTP_200_OK)