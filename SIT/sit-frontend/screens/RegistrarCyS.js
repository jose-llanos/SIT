import { View, StyleSheet, ScrollView, Modal, Text, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import InputComponente from "../components/InputComponente";
import TituloHeader from '../components/TituloHeader';
import CustomButton from '../components/CustomButton';
import { useState } from "react";
import { createCourse } from "../api/apiToken";
import { createSemestre } from "../api/apiToken";
import { createCursoSemestre } from "../api/apiToken";
import { createEstudiante } from "../api/apiToken";
import { createProfesores } from "../api/apiToken";
import { createcursoEstudiante } from "../api/apiToken";
import { createcursoProfesor } from "../api/apiToken";
import { createRoles } from "../api/apiToken";
import ModalMensaje from "../components/ModalComponente";


export default function RegistrarCyS({ navigation }) {

    //modal
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMensaje, setModalMensaje] = useState({
        tipo: 'error',
        titulo: '',
        subtitulo: '',
    });



    // Estados
    const [courseForm, setCourseForm] = useState({
        idCourse: '',
        name: '',
        acronim: '',
        status: ''
    });

    const [semesterForm, setSemesterForm] = useState({
        idSemester: '',
        semester: '',
        status: ''
    });

    const [cursoSemestreFrom, setCuroSemestreFrom] = useState({
        fechaInicio: '',
        fechaFinal: '',
        status: '',
        idCurso: '',
        idSemestre: ''

    });

    const [estudianteFrom, setEstudianteFrom] = useState({
        idEstudiante: '',
        nombre: '',
        apellido: '',
        correo: '',
        estado: ''
    })

    const [profesorFrom, setProfesorFrom] = useState({
        idProfesor: '',
        nombre: '',
        apellido: '',
        especialidad: '',
        estado: ''
    });

    const [cursoEstudianteFrom, setCursoEstudiante] = useState({
        fechaInscripcion: '',
        estado: '',
        idCurso: '',
        idEstudiante: ''
    });

    const [cursoProfesoresFrom, setCursoProfesoresFrom] = useState({
        fechaAsignacion: '',
        estado: '',
        idCurso: '',
        idProfesor: ''
    });

    const [rolesFrom, setRolesFrom] = useState({
        idRol: '',
        nombre: '',
        estado: ''
    })
    // Handlers de cambio
    const handleCourseChange = (name, value) => {
        setCourseForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSemesterChange = (name, value) => {
        setSemesterForm(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleCursoSemestreChange = (name, value) => {
        setCuroSemestreFrom(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEstudianteChange = (name, value) => {
        setEstudianteFrom(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleProfesorChange = (name, value) => {
        setProfesorFrom(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handelCursoEstudianteChange = (name, value) => {
        setCursoEstudiante(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleCursoProfesoresChange = (name, value) => {
        setCursoProfesoresFrom(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleRolesChange = (name, value) => {
        setRolesFrom(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Crear curso
    const handleCreateCourse = async () => {
        if (
            !courseForm.idCourse.trim() ||
            !courseForm.name.trim() ||
            !courseForm.acronim.trim() ||
            !courseForm.status.trim()
        ) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Campos vacíos',
                subtitulo: 'Completa Todos Los Campos',
            });
            setModalVisible(true);
            return;
        }
        const curso = {
            id_course: parseInt(courseForm.idCourse),
            name_course: courseForm.name,
            acronim: courseForm.acronim,
            status: courseForm.status.toUpperCase(),
        };

        try {
            const newCourse = await createCourse(curso);
            setModalMensaje({
                tipo: 'exito',
                titulo: '¡Registro exitoso!',
                subtitulo: `${newCourse.name_course} registrado Correctamente`,
            });
            setModalVisible(true);

            setCourseForm({
                idCourse: '',
                name: '',
                acronim: '',
                status: ''
            });

        } catch (error) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'No se pudo Registrar',
                subtitulo: error.message,
            });
            setModalVisible(true);
            return;
        }
    };

    // Crear semestre
    const handleCreateSemester = async () => {
        if (
            !semesterForm.idSemester.trim() ||
            !semesterForm.semester.trim() ||
            !semesterForm.status.trim()
        ) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Campos vacíos',
                subtitulo: 'Completa Todos Los Campos',
            });
            setModalVisible(true);
            return;
        }
        const semestre = {
            id_semester: semesterForm.idSemester ? parseInt(semesterForm.idSemester) : null,
            semester: semesterForm.semester,
            status: semesterForm.status.toUpperCase(),
        };

        try {
            const newSemester = await createSemestre(semestre);
            setModalMensaje({
                tipo: 'exito',
                titulo: '¡Registro exitoso!',
                subtitulo: `${newSemester.semester} registrado Correctamente`,
            });
            setModalVisible(true);

            setSemesterForm({
                idSemester: '',
                semester: '',
                status: ''
            })
        } catch (error) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'No Se Pudo Registrar!',
                subtitulo: error.message,
            });
            setModalVisible(true);
        }
    };

    //crear CursoSemestre
    const handlecreateCursoSemestre = async () => {
        if (
            !cursoSemestreFrom.fechaInicio.trim() ||
            !cursoSemestreFrom.fechaFinal.trim() ||
            !cursoSemestreFrom.idCurso.trim() ||
            !cursoSemestreFrom.idSemestre.trim() ||
            !cursoSemestreFrom.status.trim()
        ) {
            {
                setModalMensaje({
                    tipo: 'error',
                    titulo: 'Campos vacíos',
                    subtitulo: 'Completa Todos Los Campos',
                });
                setModalVisible(true);
                return;
            }
        }
        const cursoSemestre = {
            start_date: cursoSemestreFrom.fechaInicio,
            end_date: cursoSemestreFrom.fechaFinal,
            status: cursoSemestreFrom.status.toUpperCase(),
            id_course: cursoSemestreFrom.idCurso ? parseInt(cursoSemestreFrom.idCurso) : null,
            id_semester: cursoSemestreFrom.idSemestre ? parseInt(cursoSemestreFrom.idSemestre) : null
        };
        try {
            const newCursoSemestre = await createCursoSemestre(cursoSemestre);
            setModalMensaje({
                tipo: 'exito',
                titulo: '¡Registro exitoso!',
                subtitulo: `Registrado Correctamente`,
            });
            setModalVisible(true);

            setCuroSemestreFrom({
                fechaInicio: '',
                fechaFinal: '',
                status: '',
                idCurso: '',
                idSemestre: ''
            })
        } catch (error) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Error Al Registrar!',
                subtitulo: error.message,
            });
            setModalVisible(true);
        }
    };
    //crear Estudiante
    const handleCreateEstudiante = async () => {
        if (
            !estudianteFrom.idEstudiante.trim() ||
            !estudianteFrom.nombre.trim() ||
            !estudianteFrom.apellido.trim() ||
            !estudianteFrom.correo.trim() ||
            !estudianteFrom.estado.trim()
        ) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Campos vacíos',
                subtitulo: 'Completa Todos Los Campos',
            });
            setModalVisible(true);
            return;
        }
        const estudiante = {
            id_student: estudianteFrom.idEstudiante ? parseInt(estudianteFrom.idEstudiante) : null,
            name: estudianteFrom.nombre,
            last_name: estudianteFrom.apellido,
            email: estudianteFrom.correo,
            status: estudianteFrom.estado.toUpperCase()
        };

        try {
            const newEstudiante = await createEstudiante(estudiante);
            setModalMensaje({
                tipo: 'exito',
                titulo: '¡Registro exitoso!',
                subtitulo: `${newEstudiante.name} Registrado Correctamente`,
            });
            setModalVisible(true);

            setEstudianteFrom({
                idEstudiante: '',
                nombre: '',
                apellido: '',
                correo: '',
                estado: ''
            })
        } catch (error) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Erro Al Registrar',
                subtitulo: error.message,
            });
            setModalVisible(true);

        }
    }
    // crear Profesores
    const handleCreateProfesor = async () => {
        if (
            !profesorFrom.idProfesor.trim() ||
            !profesorFrom.nombre.trim() ||
            !profesorFrom.apellido.trim() ||
            !profesorFrom.especialidad.trim() ||
            !profesorFrom.estado.trim()
        ) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Campos vacíos',
                subtitulo: 'Completa Todos Los Campos',
            });
            setModalVisible(true);
            return;
        }
        const profesor = {
            id_teacher: profesorFrom.idProfesor ? parseInt(profesorFrom.idProfesor) : null,
            name: profesorFrom.nombre,
            last_name: profesorFrom.apellido,
            speciality_field: profesorFrom.especialidad,
            status: profesorFrom.estado.toUpperCase()
        };
        try {
            const newProfesor = await createProfesores(profesor);
            setModalMensaje({
                tipo: 'exito',
                titulo: '¡Registro Éxitoso!',
                subtitulo: `${newProfesor.name} se registró Correctamente`,
            });
            setModalVisible(true);

            setProfesorFrom({
                idProfesor: '',
                nombre: '',
                apellido: '',
                especialidad: '',
                estado: ''
            })
        } catch (error) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Error Al Registrar',
                subtitulo: error.message,
            });
            setModalVisible(true);
        }
    };

    //crear Curso-Estudiante
    const handleCreateCursoEstudiante = async () => {
        if (
            !cursoEstudianteFrom.fechaInscripcion.trim() ||
            !cursoEstudianteFrom.estado.trim() ||
            !cursoEstudianteFrom.idCurso.trim() ||
            !cursoEstudianteFrom.idEstudiante
        ) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Campos vacíos',
                subtitulo: 'Completa Todos Los Campos',
            });
            setModalVisible(true);
            return;
        }

        const cursoEstudiante = {
            enrollment_date: new Date(cursoEstudianteFrom.fechaInscripcion).toISOString(),
            status: cursoEstudianteFrom.estado.toUpperCase(),
            id_course: cursoEstudianteFrom.idCurso ? parseInt(cursoEstudianteFrom.idCurso) : null,
            id_student: cursoEstudianteFrom.idEstudiante ? parseInt(cursoEstudianteFrom.idEstudiante) : null
        };

        try {
            const newEstudiante = await createcursoEstudiante(cursoEstudiante);
            setModalMensaje({
                tipo: 'exito',
                titulo: '¡Registro Éxitoso!',
                subtitulo: 'Curso-Estudiante Registrado',
            });
            setModalVisible(true);

            setCursoEstudiante({
                fechaInscripcion: '',
                estado: '',
                idCurso: '',
                idEstudiante: ''
            })
        } catch (error) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Error al Registrar',
                subtitulo: error.message,
            });
            setModalVisible(true);
        }
    };

    const handleCreateCursoProfesores = async () => {
        if (
            !cursoProfesoresFrom.fechaAsignacion.trim() ||
            !cursoProfesoresFrom.estado.trim() ||
            !cursoProfesoresFrom.idCurso.trim() ||
            !cursoProfesoresFrom.idProfesor.trim()
        ) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Campos vacíos',
                subtitulo: 'Completa Todos Los Campos',
            });
            setModalVisible(true);
            return;
        }
        const cursoProfesor = {
            assignment_date: cursoProfesoresFrom.fechaAsignacion,
            status: cursoProfesoresFrom.estado.toUpperCase(),
            id_course: cursoProfesoresFrom.idCurso ? parseInt(cursoProfesoresFrom.idCurso) : null,
            id_teacher: cursoProfesoresFrom.idProfesor ? parseInt(cursoProfesoresFrom.idProfesor) : null
        };
        try {
            const newCursoProfesor = await createcursoProfesor(cursoProfesor);
            setModalMensaje({
                tipo: 'exito',
                titulo: '¡Registro Éxitoso!',
                subtitulo: 'Curso-Profesor Registrado Con Éxito',
            });
            setModalVisible(true);
            setCursoProfesoresFrom({
                fechaAsignacion: '',
                estado: '',
                idCurso: '',
                idProfesor: ''
            })
        } catch (error) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Erro AL Registrar',
                subtitulo: error.message,
            });
            setModalVisible(true);
        }
    };

    //crear Roles
    const handleCreateRol = async () => {
        if (
            !rolesFrom.idRol.trim() ||
            !rolesFrom.nombre.trim() ||
            !rolesFrom.estado.trim()
        ) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Campos vacíos',
                subtitulo: 'Completa Todos Los Campos',
            });
            setModalVisible(true);
            return;
        }

        const rol = {
            id_role: rolesFrom.idRol ? parseInt(rolesFrom.idRol) : null,
            name_role: rolesFrom.nombre,
            status: rolesFrom.estado.toUpperCase()
        };

        try {
            const newRol = await createRoles(rol);
            setModalMensaje({
                tipo: 'exito',
                titulo: '¡Registro Éxitoso!',
                subtitulo: `${newRol.name_role} Registrado Correctamente`,
            });
            setModalVisible(true);
            setRolesFrom({
                idRol: '',
                nombre: '',
                estado: ''
            })
        } catch (error) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Error Al Registrar!',
                subtitulo: error.message,
            });
            setModalVisible(true);
        }
    }
    return (

        <ScrollView contentContainerStyle={styles.container}>
            <ModalMensaje
                visible={modalVisible}
                tipo={modalMensaje.tipo}
                titulo={modalMensaje.titulo}
                subtitulo={modalMensaje.subtitulo}
                autoClose={true}
                onClose={() => setModalVisible(false)}
            />
            {/*----Sección Cursos-------*/}

            <TituloHeader title=' Cursos' fontSize={25} />
            <InputComponente
                placeholder="Id course"
                value={courseForm.idCourse}
                onChangeText={(value) => handleCourseChange('idCourse', value)}
            />
            <InputComponente
                placeholder="Name course"
                value={courseForm.name}
                onChangeText={(value) => handleCourseChange('name', value)}
            />
            <InputComponente
                placeholder="Acronim"
                value={courseForm.acronim}
                onChangeText={(value) => handleCourseChange('acronim', value)}
            />
            <InputComponente
                placeholder="Status"
                value={courseForm.status}
                onChangeText={(value) => handleCourseChange('status', value)}
            />
            <View style={styles.containerButton}>
                <CustomButton
                    title='Registrar'
                    backgroundColor='#1CD444'
                    styles={{ paddingVertical: 2, fontSize: 10 }}
                    onPress={handleCreateCourse}
                />

            </View>

            {/*---------- Sección SEMESTRE -------*/}
            <TituloHeader title='Semestres' fontSize={25} />
            <InputComponente
                placeholder="Id semester"
                value={semesterForm.idSemester}
                onChangeText={(value) => handleSemesterChange('idSemester', value)}
            />
            <InputComponente
                placeholder="Semester"
                value={semesterForm.semester}
                onChangeText={(value) => handleSemesterChange('semester', value)}
            />
            <InputComponente
                placeholder="Status"
                value={semesterForm.status}
                onChangeText={(value) => handleSemesterChange('status', value)}
            />
            <View style={styles.containerButton}>
                <CustomButton
                    title='Registrar'
                    backgroundColor='#1CD444'
                    styles={{ paddingVertical: 2, fontSize: 10 }}
                    onPress={handleCreateSemester}
                />
            </View>
            {/*---------- Sección CURSOSEMESTRE -------*/}
            <TituloHeader title='CursoSemestre' fontSize={25} />
            <InputComponente placeholder='Fehca De Inicio' type="date"
                value={cursoSemestreFrom.fechaInicio}
                onChangeText={(value) => handleCursoSemestreChange('fechaInicio', value)}
            />
            <InputComponente placeholder='Fehca Final' type="date"
                value={cursoSemestreFrom.fechaFinal}
                onChangeText={(value) => handleCursoSemestreChange('fechaFinal', value)}
            />
            <InputComponente placeholder='Estado'
                type="text"
                value={cursoSemestreFrom.status}
                onChangeText={(value) => handleCursoSemestreChange('status', value)} />
            <InputComponente placeholder='Id Curso'
                type="text"
                value={cursoSemestreFrom.idCurso}
                onChangeText={(value) => handleCursoSemestreChange('idCurso', value)} />
            <InputComponente placeholder='Id Semestre'
                type="text"
                value={cursoSemestreFrom.idSemestre}
                onChangeText={(value) => handleCursoSemestreChange('idSemestre', value)} />

            <View style={styles.containerButton}>
                <CustomButton
                    title='Registrar'
                    backgroundColor='#1CD444'
                    onPress={handlecreateCursoSemestre}
                />
            </View>
            {/*---------- Sección  ESTUDIANTES -------*/}
            <TituloHeader title='Estudiantes' fontSize={25} />
            <InputComponente
                placeholder="Id Estudiante"
                type="text"
                value={estudianteFrom.idEstudiante}
                onChangeText={(value) => handleEstudianteChange('idEstudiante', value)}
            />
            <InputComponente
                placeholder="Nombre"
                type="text"
                value={estudianteFrom.nombre}
                onChangeText={(value) => handleEstudianteChange('nombre', value)}
            />
            <InputComponente
                placeholder="Apellido"
                type="text"
                value={estudianteFrom.apellido}
                onChangeText={(value) => handleEstudianteChange('apellido', value)}
            />
            <InputComponente
                placeholder="Email"
                type="text"
                value={estudianteFrom.correo}
                onChangeText={(value) => handleEstudianteChange('correo', value)}
            />
            <InputComponente
                placeholder="Estado"
                type="text"
                value={estudianteFrom.estado}
                onChangeText={(value) => handleEstudianteChange('estado', value)}
            />
            <View style={styles.containerButton}>
                <CustomButton
                    title='Registrar'
                    backgroundColor='#1CD444'
                    onPress={handleCreateEstudiante}
                />
            </View>
            {/*---------- Sección Profesores -------*/}
            <TituloHeader title='Profesores' fontSize={25} />
            <InputComponente
                placeholder="Id Profesor"
                type="text"
                value={profesorFrom.idProfesor}
                onChangeText={(value) => handleProfesorChange('idProfesor', value)}
            />
            <InputComponente
                placeholder="Nombre"
                type="text"
                value={profesorFrom.nombre}
                onChangeText={(value) => handleProfesorChange('nombre', value)} />
            <InputComponente
                placeholder="Apellido"
                type="text"
                value={profesorFrom.apellido}
                onChangeText={(value) => handleProfesorChange('apellido', value)}
            />
            <InputComponente
                placeholder="Campo de especialidad"
                type="text"
                value={profesorFrom.especialidad}
                onChangeText={(value) => handleProfesorChange('especialidad', value)}
            />
            <InputComponente
                placeholder="Estado"
                type="text"
                value={profesorFrom.estado}
                onChangeText={(value) => handleProfesorChange('estado', value)}
            />
            <View style={styles.containerButton}>
                <CustomButton
                    title='Registrar'
                    backgroundColor='#1CD444'
                    onPress={handleCreateProfesor} />
            </View>
            {/*---------- Sección Curso Estudiantes -------*/}
            <TituloHeader title='Curso Estudiantes' fontSize={25} />
            <InputComponente placeholder='Fecha de inscripción De Inicio' type="date"
                value={cursoEstudianteFrom.fechaInscripcion}
                onChangeText={(value) => handelCursoEstudianteChange('fechaInscripcion', value)}
            />
            <InputComponente placeholder='Estado'
                type="text"
                value={cursoEstudianteFrom.estado}
                onChangeText={(value) => handelCursoEstudianteChange('estado', value)} />
            <InputComponente placeholder='Id Curso'
                type="text"
                value={cursoEstudianteFrom.idCurso}
                onChangeText={(value) => handelCursoEstudianteChange('idCurso', value)} />
            <InputComponente placeholder='Id Estudiante'
                type="text"
                value={cursoEstudianteFrom.idEstudiante}
                onChangeText={(value) => handelCursoEstudianteChange('idEstudiante', value)} />

            <View style={styles.containerButton}>
                <CustomButton
                    title='Registrar'
                    backgroundColor='#1CD444'
                    onPress={handleCreateCursoEstudiante}
                />
            </View>

            {/*---------- Sección Curso Profesores -------*/}

            <TituloHeader title='Curso Profesores' fontSize={25} />
            <InputComponente placeholder='Fecha de entrega' type="date"
                value={cursoProfesoresFrom.fechaAsignacion}
                onChangeText={(value) => handleCursoProfesoresChange('fechaAsignacion', value)}
            />
            <InputComponente placeholder='Estado'
                type="text"
                value={cursoProfesoresFrom.estado}
                onChangeText={(value) => handleCursoProfesoresChange('estado', value)} />
            <InputComponente placeholder='Id Curso'
                type="text"
                value={cursoProfesoresFrom.idCurso}
                onChangeText={(value) => handleCursoProfesoresChange('idCurso', value)} />
            <InputComponente placeholder='Id Profesor'
                type="text"
                value={cursoProfesoresFrom.idProfesor}
                onChangeText={(value) => handleCursoProfesoresChange('idProfesor', value)} />

            <View style={styles.containerButton}>
                <CustomButton
                    title='Registrar'
                    backgroundColor='#1CD444'
                    onPress={handleCreateCursoProfesores}
                />
            </View>

            <TituloHeader title='Roles' fontSize={25} />
            <InputComponente
                placeholder="Id Rol"
                value={rolesFrom.idRol}
                onChangeText={(value) => handleRolesChange('idRol', value)}
            />
            <InputComponente
                placeholder="Nombre"
                value={rolesFrom.nombre}
                onChangeText={(value) => handleRolesChange('nombre', value)}
            />
            <InputComponente
                placeholder="Status"
                value={rolesFrom.estado}
                onChangeText={(value) => handleRolesChange('estado', value)}
            />
            <View style={styles.containerButton}>
                <CustomButton
                    title='Registrar'
                    backgroundColor='#1CD444'
                    styles={{ paddingVertical: 2, fontSize: 10 }}
                    onPress={handleCreateRol}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: '100dvh',
        backgroundColor: '#fff',
        gap: 10
    },
    containerButton: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
    },
});
