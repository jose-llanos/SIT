from rest_framework import serializers
from .models import (
    Course, Semester, CourseSemester, Students, Teachers, 
    CourseStudents, CourseTeachers, Grades, Tasks, Role, CourseSemesterTasks
)

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = '__all__'

class CourseSemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseSemester
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teachers
        fields = '__all__'

class CourseStudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseStudents
        fields = '__all__'

class CourseTeachersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseTeachers
        fields = '__all__'

class GradesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grades
        fields = '__all__'

class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class CourseSemesterTasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseSemesterTasks
        fields = '__all__'
