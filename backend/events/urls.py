from django.urls import path
from . import views

urlpatterns = [
    path("events/", views.event_list),                    # GET  - list all
    path("events/add/", views.event_add),                 # POST - create
    path("events/<int:pk>/", views.event_detail),          # GET  - single event
    path("events/update/<int:pk>/", views.event_update),   # POST - update
    path("events/delete/<int:pk>/", views.event_delete),   # POST - delete
]
