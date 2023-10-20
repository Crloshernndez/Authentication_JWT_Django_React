from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializer import UserCreateSerializer, UserSerializer

# Create your views here.


class RegisterView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, *args, **kwargs):
        data = request.data

        serializer = UserCreateSerializer(data=data)

        if not serializer.is_valid():
            return Response({'message': 'user account with this email already exists.'}, status=status.HTTP_404_NOT_FOUND)
        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)

        return Response({'success': 'User created', 'data': user.data}, status=status.HTTP_201_CREATED)


class RetrieveUserView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        user = request.user
        user = UserSerializer(user)

        return Response({'success': 'User found', 'data': user.data}, status=status.HTTP_200_OK)
