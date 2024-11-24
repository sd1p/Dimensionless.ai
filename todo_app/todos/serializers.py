# todo_app/serializers.py
from rest_framework import serializers
from .models import ToDo  # Import the ToDo model

class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo  # Specify the model
        fields = ['id', 'title', 'description', 'completed', 'created_at']  # List the fields you want to expose
