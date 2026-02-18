from rest_framework import viewsets
from .models import (
    Course, Semester, CourseSemester, Students, Teachers,
    CourseStudents, CourseTeachers, Grades, Tasks, Role, CourseSemesterTasks
)
from .serializers import (
    CourseSerializer, SemesterSerializer, CourseSemesterSerializer, StudentSerializer, 
    TeacherSerializer, CourseStudentsSerializer, CourseTeachersSerializer, GradesSerializer, 
    TasksSerializer, RoleSerializer, CourseSemesterTasksSerializer
)
from django.shortcuts import render

def api_home(request):
    return render(request, 'api_home.html')

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class SemesterViewSet(viewsets.ModelViewSet):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer

class CourseSemesterViewSet(viewsets.ModelViewSet):
    queryset = CourseSemester.objects.all()
    serializer_class = CourseSemesterSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Students.objects.all()
    serializer_class = StudentSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teachers.objects.all()
    serializer_class = TeacherSerializer

class CourseStudentsViewSet(viewsets.ModelViewSet):
    queryset = CourseStudents.objects.all()
    serializer_class = CourseStudentsSerializer

class CourseTeachersViewSet(viewsets.ModelViewSet):
    queryset = CourseTeachers.objects.all()
    serializer_class = CourseTeachersSerializer

class GradesViewSet(viewsets.ModelViewSet):
    queryset = Grades.objects.all()
    serializer_class = GradesSerializer

class TasksViewSet(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class CourseSemesterTasksViewSet(viewsets.ModelViewSet):
    queryset = CourseSemesterTasks.objects.all()
    serializer_class = CourseSemesterTasksSerializer
