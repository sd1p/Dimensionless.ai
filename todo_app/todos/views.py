from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ToDo
from .serializers import ToDoSerializer

class ToDoList(APIView):
    def get(self, request):
        """
        Display list of all To-Do tasks.
        """
        todos = ToDo.objects.all()
        serializer = ToDoSerializer(todos, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Add a new To-Do task.
        """
        serializer = ToDoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        """
        Delete all To-Do tasks.
        """
        ToDo.objects.all().delete()  # Deletes all tasks
        return Response({'message': 'All tasks deleted'}, status=status.HTTP_204_NO_CONTENT)


class ToDoDetail(APIView):
    def get(self, request, pk):
        """
        Display a single To-Do task based on its ID.
        """
        try:
            todo = ToDo.objects.get(pk=pk)
        except ToDo.DoesNotExist:
            return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ToDoSerializer(todo)
        return Response(serializer.data)

    def put(self, request, pk):
        """
        Update a specific To-Do task.
        """
        try:
            todo = ToDo.objects.get(pk=pk)
        except ToDo.DoesNotExist:
            return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ToDoSerializer(todo, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()  
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Delete a specific To-Do task.
        """
        try:
            todo = ToDo.objects.get(pk=pk)
        except ToDo.DoesNotExist:
            return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
        
        todo.delete()
        return Response({'message': 'Task deleted'}, status=status.HTTP_204_NO_CONTENT)
