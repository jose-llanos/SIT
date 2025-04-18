PGDMP  4    )                }            sit    17.4 (Debian 17.4-1.pgdg120+2)    17.4 @    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    42957    sit    DATABASE     n   CREATE DATABASE sit WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE sit;
                     postgres    false            �            1259    42968    course    TABLE     �   CREATE TABLE public.course (
    id_course integer NOT NULL,
    name_course character varying(250) NOT NULL,
    acronim character varying(10) NOT NULL,
    status character(1) NOT NULL
);
    DROP TABLE public.course;
       public         heap r       postgres    false            �            1259    43068    course_semester    TABLE     )  CREATE TABLE public.course_semester (
    id integer NOT NULL,
    id_course integer NOT NULL,
    id_semester integer NOT NULL,
    start_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    end_date timestamp without time zone,
    status character(1) DEFAULT 'A'::bpchar NOT NULL
);
 #   DROP TABLE public.course_semester;
       public         heap r       postgres    false            �            1259    43067    course_semester_id_seq    SEQUENCE     �   CREATE SEQUENCE public.course_semester_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.course_semester_id_seq;
       public               postgres    false    229            �           0    0    course_semester_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.course_semester_id_seq OWNED BY public.course_semester.id;
          public               postgres    false    228            �            1259    43193    course_semester_tasks    TABLE     �   CREATE TABLE public.course_semester_tasks (
    id_task integer NOT NULL,
    id_course integer NOT NULL,
    id_semester integer NOT NULL
);
 )   DROP TABLE public.course_semester_tasks;
       public         heap r       postgres    false            �            1259    43016    course_students    TABLE       CREATE TABLE public.course_students (
    id integer NOT NULL,
    id_course integer NOT NULL,
    id_student integer NOT NULL,
    enrollment_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character(1) DEFAULT 'A'::bpchar NOT NULL
);
 #   DROP TABLE public.course_students;
       public         heap r       postgres    false            �            1259    43015    course_students_id_seq    SEQUENCE     �   CREATE SEQUENCE public.course_students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.course_students_id_seq;
       public               postgres    false    223            �           0    0    course_students_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.course_students_id_seq OWNED BY public.course_students.id;
          public               postgres    false    222            �            1259    43042    course_teachers    TABLE       CREATE TABLE public.course_teachers (
    id integer NOT NULL,
    id_course integer NOT NULL,
    id_teacher integer NOT NULL,
    assignment_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character(1) DEFAULT 'A'::bpchar NOT NULL
);
 #   DROP TABLE public.course_teachers;
       public         heap r       postgres    false            �            1259    43041    course_teachers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.course_teachers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.course_teachers_id_seq;
       public               postgres    false    226            �           0    0    course_teachers_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.course_teachers_id_seq OWNED BY public.course_teachers.id;
          public               postgres    false    225            �            1259    42973    grades    TABLE     Y  CREATE TABLE public.grades (
    id_grade integer NOT NULL,
    id_course integer NOT NULL,
    id_student integer NOT NULL,
    id_task integer NOT NULL,
    grade numeric(1,1) NOT NULL,
    number_tries integer NOT NULL,
    results character varying(255) NOT NULL,
    delivery_time numeric(5,2) NOT NULL,
    status character(1) NOT NULL
);
    DROP TABLE public.grades;
       public         heap r       postgres    false            �            1259    43036    role    TABLE     �   CREATE TABLE public.role (
    id_role integer NOT NULL,
    name_role character varying(50) NOT NULL,
    status character(1) NOT NULL
);
    DROP TABLE public.role;
       public         heap r       postgres    false            �            1259    43062    semester    TABLE     �   CREATE TABLE public.semester (
    id_semester integer NOT NULL,
    semester character varying(50) NOT NULL,
    status character(1) NOT NULL
);
    DROP TABLE public.semester;
       public         heap r       postgres    false            �            1259    42963    students    TABLE     �   CREATE TABLE public.students (
    id_student integer NOT NULL,
    name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    status character(1) NOT NULL
);
    DROP TABLE public.students;
       public         heap r       postgres    false            �            1259    43088    tasks    TABLE     �   CREATE TABLE public.tasks (
    id_task integer NOT NULL,
    id_course_semester integer NOT NULL,
    task_name character varying(255) NOT NULL,
    state character(1) NOT NULL
);
    DROP TABLE public.tasks;
       public         heap r       postgres    false            �            1259    42978    teachers    TABLE     �   CREATE TABLE public.teachers (
    id_teacher integer NOT NULL,
    name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    "speciality " character varying(250) NOT NULL,
    status character(1) NOT NULL
);
    DROP TABLE public.teachers;
       public         heap r       postgres    false            �            1259    42958    user    TABLE     -  CREATE TABLE public."user" (
    id_user integer NOT NULL,
    name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    status character(1) NOT NULL,
    id_role integer NOT NULL
);
    DROP TABLE public."user";
       public         heap r       postgres    false            �           2604    43071    course_semester id    DEFAULT     x   ALTER TABLE ONLY public.course_semester ALTER COLUMN id SET DEFAULT nextval('public.course_semester_id_seq'::regclass);
 A   ALTER TABLE public.course_semester ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    229    228    229            �           2604    43019    course_students id    DEFAULT     x   ALTER TABLE ONLY public.course_students ALTER COLUMN id SET DEFAULT nextval('public.course_students_id_seq'::regclass);
 A   ALTER TABLE public.course_students ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    223    223            �           2604    43045    course_teachers id    DEFAULT     x   ALTER TABLE ONLY public.course_teachers ALTER COLUMN id SET DEFAULT nextval('public.course_teachers_id_seq'::regclass);
 A   ALTER TABLE public.course_teachers ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    226    225    226            {          0    42968    course 
   TABLE DATA           I   COPY public.course (id_course, name_course, acronim, status) FROM stdin;
    public               postgres    false    219   Q       �          0    43068    course_semester 
   TABLE DATA           c   COPY public.course_semester (id, id_course, id_semester, start_date, end_date, status) FROM stdin;
    public               postgres    false    229   5Q       �          0    43193    course_semester_tasks 
   TABLE DATA           P   COPY public.course_semester_tasks (id_task, id_course, id_semester) FROM stdin;
    public               postgres    false    231   RQ                 0    43016    course_students 
   TABLE DATA           ]   COPY public.course_students (id, id_course, id_student, enrollment_date, status) FROM stdin;
    public               postgres    false    223   oQ       �          0    43042    course_teachers 
   TABLE DATA           ]   COPY public.course_teachers (id, id_course, id_teacher, assignment_date, status) FROM stdin;
    public               postgres    false    226   �Q       |          0    42973    grades 
   TABLE DATA              COPY public.grades (id_grade, id_course, id_student, id_task, grade, number_tries, results, delivery_time, status) FROM stdin;
    public               postgres    false    220   �Q       �          0    43036    role 
   TABLE DATA           :   COPY public.role (id_role, name_role, status) FROM stdin;
    public               postgres    false    224   �Q       �          0    43062    semester 
   TABLE DATA           A   COPY public.semester (id_semester, semester, status) FROM stdin;
    public               postgres    false    227   �Q       z          0    42963    students 
   TABLE DATA           N   COPY public.students (id_student, name, last_name, email, status) FROM stdin;
    public               postgres    false    218    R       �          0    43088    tasks 
   TABLE DATA           N   COPY public.tasks (id_task, id_course_semester, task_name, state) FROM stdin;
    public               postgres    false    230   R       }          0    42978    teachers 
   TABLE DATA           V   COPY public.teachers (id_teacher, name, last_name, "speciality ", status) FROM stdin;
    public               postgres    false    221   :R       y          0    42958    user 
   TABLE DATA           \   COPY public."user" (id_user, name, last_name, email, password, status, id_role) FROM stdin;
    public               postgres    false    217   WR       �           0    0    course_semester_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.course_semester_id_seq', 1, false);
          public               postgres    false    228            �           0    0    course_students_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.course_students_id_seq', 1, false);
          public               postgres    false    222            �           0    0    course_teachers_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.course_teachers_id_seq', 1, false);
          public               postgres    false    225            �           2606    42972    course course_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (id_course);
 <   ALTER TABLE ONLY public.course DROP CONSTRAINT course_pkey;
       public                 postgres    false    219            �           2606    43077 9   course_semester course_semester_id_course_id_semester_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.course_semester
    ADD CONSTRAINT course_semester_id_course_id_semester_key UNIQUE (id_course, id_semester);
 c   ALTER TABLE ONLY public.course_semester DROP CONSTRAINT course_semester_id_course_id_semester_key;
       public                 postgres    false    229    229            �           2606    43075 $   course_semester course_semester_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.course_semester
    ADD CONSTRAINT course_semester_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.course_semester DROP CONSTRAINT course_semester_pkey;
       public                 postgres    false    229            �           2606    43197 0   course_semester_tasks course_semester_tasks_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.course_semester_tasks
    ADD CONSTRAINT course_semester_tasks_pkey PRIMARY KEY (id_task, id_course, id_semester);
 Z   ALTER TABLE ONLY public.course_semester_tasks DROP CONSTRAINT course_semester_tasks_pkey;
       public                 postgres    false    231    231    231            �           2606    43025 8   course_students course_students_id_course_id_student_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.course_students
    ADD CONSTRAINT course_students_id_course_id_student_key UNIQUE (id_course, id_student);
 b   ALTER TABLE ONLY public.course_students DROP CONSTRAINT course_students_id_course_id_student_key;
       public                 postgres    false    223    223            �           2606    43023 $   course_students course_students_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.course_students
    ADD CONSTRAINT course_students_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.course_students DROP CONSTRAINT course_students_pkey;
       public                 postgres    false    223            �           2606    43051 8   course_teachers course_teachers_id_course_id_teacher_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.course_teachers
    ADD CONSTRAINT course_teachers_id_course_id_teacher_key UNIQUE (id_course, id_teacher);
 b   ALTER TABLE ONLY public.course_teachers DROP CONSTRAINT course_teachers_id_course_id_teacher_key;
       public                 postgres    false    226    226            �           2606    43049 $   course_teachers course_teachers_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.course_teachers
    ADD CONSTRAINT course_teachers_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.course_teachers DROP CONSTRAINT course_teachers_pkey;
       public                 postgres    false    226            �           2606    42977    grades grades_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_pkey PRIMARY KEY (id_grade, id_course, id_student, id_task);
 <   ALTER TABLE ONLY public.grades DROP CONSTRAINT grades_pkey;
       public                 postgres    false    220    220    220    220            �           2606    43040    role role_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id_role);
 8   ALTER TABLE ONLY public.role DROP CONSTRAINT role_pkey;
       public                 postgres    false    224            �           2606    43066    semester semester_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.semester
    ADD CONSTRAINT semester_pkey PRIMARY KEY (id_semester);
 @   ALTER TABLE ONLY public.semester DROP CONSTRAINT semester_pkey;
       public                 postgres    false    227            �           2606    42967    students student_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.students
    ADD CONSTRAINT student_pkey PRIMARY KEY (id_student);
 ?   ALTER TABLE ONLY public.students DROP CONSTRAINT student_pkey;
       public                 postgres    false    218            �           2606    43092    tasks tasks_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id_task);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public                 postgres    false    230            �           2606    42982    teachers teacher_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teacher_pkey PRIMARY KEY (id_teacher);
 ?   ALTER TABLE ONLY public.teachers DROP CONSTRAINT teacher_pkey;
       public                 postgres    false    221            �           2606    42962    user user_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id_user);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public                 postgres    false    217            �           2606    43026    course_students fk_course    FK CONSTRAINT     �   ALTER TABLE ONLY public.course_students
    ADD CONSTRAINT fk_course FOREIGN KEY (id_course) REFERENCES public.course(id_course) ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.course_students DROP CONSTRAINT fk_course;
       public               postgres    false    223    219    3270            �           2606    43052    course_teachers fk_course    FK CONSTRAINT     �   ALTER TABLE ONLY public.course_teachers
    ADD CONSTRAINT fk_course FOREIGN KEY (id_course) REFERENCES public.course(id_course);
 C   ALTER TABLE ONLY public.course_teachers DROP CONSTRAINT fk_course;
       public               postgres    false    3270    226    219            �           2606    43078    course_semester fk_course    FK CONSTRAINT     �   ALTER TABLE ONLY public.course_semester
    ADD CONSTRAINT fk_course FOREIGN KEY (id_course) REFERENCES public.course(id_course);
 C   ALTER TABLE ONLY public.course_semester DROP CONSTRAINT fk_course;
       public               postgres    false    3270    219    229            �           2606    43083    course_semester fk_semester    FK CONSTRAINT     �   ALTER TABLE ONLY public.course_semester
    ADD CONSTRAINT fk_semester FOREIGN KEY (id_semester) REFERENCES public.semester(id_semester);
 E   ALTER TABLE ONLY public.course_semester DROP CONSTRAINT fk_semester;
       public               postgres    false    227    3286    229            �           2606    43031    course_students fk_student    FK CONSTRAINT     �   ALTER TABLE ONLY public.course_students
    ADD CONSTRAINT fk_student FOREIGN KEY (id_student) REFERENCES public.students(id_student) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.course_students DROP CONSTRAINT fk_student;
       public               postgres    false    3268    223    218            �           2606    43057    course_teachers fk_teacher    FK CONSTRAINT     �   ALTER TABLE ONLY public.course_teachers
    ADD CONSTRAINT fk_teacher FOREIGN KEY (id_teacher) REFERENCES public.teachers(id_teacher);
 D   ALTER TABLE ONLY public.course_teachers DROP CONSTRAINT fk_teacher;
       public               postgres    false    221    226    3274            �           2606    43203    course_semester_tasks id_course    FK CONSTRAINT     �   ALTER TABLE ONLY public.course_semester_tasks
    ADD CONSTRAINT id_course FOREIGN KEY (id_course) REFERENCES public.course(id_course);
 I   ALTER TABLE ONLY public.course_semester_tasks DROP CONSTRAINT id_course;
       public               postgres    false    231    219    3270            �           2606    43208 !   course_semester_tasks id_semester    FK CONSTRAINT     �   ALTER TABLE ONLY public.course_semester_tasks
    ADD CONSTRAINT id_semester FOREIGN KEY (id_semester) REFERENCES public.semester(id_semester);
 K   ALTER TABLE ONLY public.course_semester_tasks DROP CONSTRAINT id_semester;
       public               postgres    false    231    227    3286            �           2606    43198    course_semester_tasks id_task    FK CONSTRAINT     �   ALTER TABLE ONLY public.course_semester_tasks
    ADD CONSTRAINT id_task FOREIGN KEY (id_task) REFERENCES public.tasks(id_task);
 G   ALTER TABLE ONLY public.course_semester_tasks DROP CONSTRAINT id_task;
       public               postgres    false    231    230    3292            {      x������ � �      �      x������ � �      �      x������ � �            x������ � �      �      x������ � �      |      x������ � �      �      x������ � �      �      x������ � �      z      x������ � �      �      x������ � �      }      x������ � �      y      x������ � �     