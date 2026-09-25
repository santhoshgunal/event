from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Event
from .serializers import EventSerializer


# GET  /api/events/            -> list every event
@api_view(["GET"])
def event_list(request):
    events = Event.objects.all().order_by("date", "time")
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)


# GET  /api/events/<pk>/       -> get one event (used to pre-fill the edit form)
@api_view(["GET"])
def event_detail(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = EventSerializer(event)
    return Response(serializer.data)


# POST /api/events/add/        -> create a new event
@api_view(["POST"])
def event_add(request):
    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# POST /api/events/update/<pk>/ -> update an existing event
@api_view(["POST"])
def event_update(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = EventSerializer(event, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# POST /api/events/delete/<pk>/ -> delete an event
@api_view(["POST"])
def event_delete(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

    event.delete()
    return Response({"message": "Event deleted"}, status=status.HTTP_200_OK)
