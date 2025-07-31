#from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models


class Course(models.Model):
    id_course = models.IntegerField(primary_key=True)
    name_course = models.CharField(max_length=250)
    acronim = models.CharField(max_length=10)
    status = models.CharField(max_length=1)

    class Meta:
        managed = False
        db_table = 'course'


class CourseSemester(models.Model):
    id_course = models.ForeignKey(Course, models.DO_NOTHING, db_column='id_course')
    id_semester = models.ForeignKey('Semester', models.DO_NOTHING, db_column='id_semester')
    start_date = models.DateTimeField(blank=True, null=True)
    end_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=1)

    class Meta:
        managed = False
        db_table = 'course_semester'
        unique_together = (('id_course', 'id_semester'),)


class CourseSemesterTasks(models.Model):
    pk = models.CompositePrimaryKey('id_task', 'id_course', 'id_semester')
    id_task = models.ForeignKey('Tasks', models.DO_NOTHING, db_column='id_task')
    id_course = models.ForeignKey(Course, models.DO_NOTHING, db_column='id_course')
    id_semester = models.ForeignKey('Semester', models.DO_NOTHING, db_column='id_semester')

    class Meta:
        managed = False
        db_table = 'course_semester_tasks'
        unique_together = (('id_task', 'id_course', 'id_semester'),)


class CourseStudents(models.Model):
    id_course = models.ForeignKey(Course, models.DO_NOTHING, db_column='id_course')
    id_student = models.ForeignKey('Students', models.DO_NOTHING, db_column='id_student')
    enrollment_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=1)

    class Meta:
        managed = False
        db_table = 'course_students'
        unique_together = (('id_course', 'id_student'),)


class CourseTeachers(models.Model):
    id_course = models.ForeignKey(Course, models.DO_NOTHING, db_column='id_course')
    id_teacher = models.ForeignKey('Teachers', models.DO_NOTHING, db_column='id_teacher')
    assignment_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=1)

    class Meta:
        managed = False
        db_table = 'course_teachers'
        unique_together = (('id_course', 'id_teacher'),)


class Grades(models.Model):
    pk = models.CompositePrimaryKey('id_grade', 'id_course', 'id_student', 'id_task')
    id_grade = models.IntegerField()
    id_course = models.IntegerField()
    id_student = models.IntegerField()
    id_task = models.IntegerField()
    grade = models.DecimalField(max_digits=1, decimal_places=1)
    number_tries = models.IntegerField()
    results = models.CharField(max_length=255)
    delivery_time = models.DecimalField(max_digits=5, decimal_places=2)
    status = models.CharField(max_length=1)

    class Meta:
        managed = False
        db_table = 'grades'
        unique_together = (('id_grade', 'id_course', 'id_student', 'id_task'),)


class Role(models.Model):
    id_role = models.IntegerField(primary_key=True)
    name_role = models.CharField(max_length=50)
    status = models.CharField(max_length=1)

    class Meta:
        managed = False
        db_table = 'role'


class Semester(models.Model):
    id_semester = models.IntegerField(primary_key=True)
    semester = models.CharField(max_length=50)
    status = models.CharField(max_length=1)

    class Meta:
        managed = False
        db_table = 'semester'


class Students(models.Model):
    id_student = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    status = models.CharField(max_length=1)

    class Meta:
        managed = False
        db_table = 'students'


class Tasks(models.Model):
    id_task = models.IntegerField(primary_key=True)
    id_course_semester = models.IntegerField()
    task_name = models.CharField(max_length=255)
    state = models.CharField(max_length=1)

    class Meta:
        managed = False
        db_table = 'tasks'


class Teachers(models.Model):
    id_teacher = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    speciality_field = models.CharField(db_column='speciality ', max_length=250)  # Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.
    status = models.CharField(max_length=1)

    class Meta:
        managed = False
        db_table = 'teachers'

