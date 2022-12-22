from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from base.models import Note
from .serializers import NoteSerializer, UserSerialzer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class GetRoutes(APIView):
    def get(self, request):
        routes = [
            '/api/token',
            '/api/token/refresh'
        ]
        return Response(routes)

@permission_classes([IsAuthenticated])
class getNotes(APIView):
    def get(self, request):
        user = request.user
        notes = user.note_set.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerialzer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

# class LoginView(APIView):
#     def post(self, request):
#         email = request.data['email']
#         password = request.data['password']

#         user = User.objects.filter(email = email).first()
#         if user is None:
#             raise AuthenticationFailed('No user found with given credentials')

#         if not user.check_password(password):
#             raise AuthenticationFailed('Incorrect password')


#         payload = {
#             'id': user.id,
#             'exp': timezone.now() + timezone.timedelta(minutes=10),
#             'iat': timezone.now()
#         }
#         encoded_token = jwt.encode(payload, 'secret')

#         response = Response()

#         response.set_cookie(key='jwt', value=encoded_token, httponly=True)
#         response.data = {
#             'jwt': encoded_token
#         }
#         return response

# class UserView(APIView):
#     def get(self, request):
#         token = request.COOKIES.get('jwt')

#         if not token:
#             raise AuthenticationFailed('No token found')
        
#         try:
#             payload = jwt.decode(token, 'secret', algorithms=["HS256"])
#         except jwt.ExpiredSignatureError:
#             raise AuthenticationFailed('Unauthenticated')

#         user = User.objects.filter(id = payload['id']).first()
#         serializer = UserSerialzer(user, many=False)

#         return Response(serializer.data)

# class LogoutView(APIView):
#     def post(self, request):
#         response = Response()
#         response.delete_cookie('jwt')
#         response.data = {
#             'message': 'success'
#         }
#         return response
