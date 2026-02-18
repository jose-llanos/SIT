from rest_framework import routers
from .views import (
    CourseViewSet, SemesterViewSet, CourseSemesterViewSet, StudentViewSet, TeacherViewSet,
    CourseStudentsViewSet, CourseTeachersViewSet, GradesViewSet, TasksViewSet, 
    RoleViewSet, CourseSemesterTasksViewSet
)

router = routers.DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'semesters', SemesterViewSet)
router.register(r'course-semesters', CourseSemesterViewSet)
router.register(r'students', StudentViewSet)
router.register(r'teachers', TeacherViewSet)
router.register(r'course-students', CourseStudentsViewSet)
router.register(r'course-teachers', CourseTeachersViewSet)
router.register(r'grades', GradesViewSet)
router.register(r'tasks', TasksViewSet)
router.register(r'roles', RoleViewSet)
#router.register(r'users', UserViewSet)
router.register(r'course-semester-tasks', CourseSemesterTasksViewSet)

urlpatterns = router.urls
