import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import TablaComponente from "../components/TablaComponente";
import { obtenerEstudiantes } from "../api/apiToken";
import { obtenerProfesores } from "../api/apiToken";
import { obtenerCursos } from "../api/apiToken";
import { obtenerSemestres } from "../api/apiToken";
import { obtenerCursoSemestre } from "../api/apiToken";
import { obtenerCursoProfesores } from "../api/apiToken";
import { obtenerCursoEstudiantes } from "../api/apiToken";
import { obtenerUsuarios } from "../api/apiToken";
import { obtenerRoles } from "../api/apiToken";
import { fetchConToken } from "../api/apiToken";
import ModalMensaje from "../components/ModalComponente";

const opciones = [
    { label: 'Estudiantes', value: 'estudiantes' },
    { label: 'Profesores', value: 'profesores' },
    { label: 'Cursos', value: 'cursos' },
    { label: 'Semestres', value: 'semestres' },
    { label: 'Curso-Profesores', value: 'curso_profesores' },
    { label: 'Curso-Estudiantes', value: 'curso_estudiantes' },
    { label: 'Curso-Semestres', value: 'curso_semestres' },
    { label: 'Roles', value: 'roles' },
    { label: 'Usuarios', value: 'users' }
];

export default function VerRegistrosScreen({ navigation }) {

    //modal
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMensaje, setModalMensaje] = useState({
        tipo: 'error',
        titulo: '',
        subtitulo: '',
    });

    const [selectedTable, setSelectedTable] = useState('estudiantes');
    const [datos, setDatos] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    //para actualizar Put
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
    const [modalVisto, setModalVisto] = useState(false);

    const tablasConPut = ['estudiantes', 'profesores', 'cursos', 'semestres', 'users'];


    const handleRowPress = (registro) => {
        if (!tablasConPut.includes(selectedTable)) return;
        setRegistroSeleccionado(registro);
        setModalVisto(true);
    };


    //Mostrar Los Datos Get
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                let data = [];

                switch (selectedTable) {
                    case 'estudiantes':
                        data = await obtenerEstudiantes();
                        setHeaders(['id_student', 'name', 'last_name', 'email', 'status']);
                        break;
                    case 'profesores':
                        data = await obtenerProfesores();
                        setHeaders(['id_teacher', 'name', 'last_name',]);
                        break;
                    case 'cursos':
                        data = await obtenerCursos();
                        setHeaders(['id_course', 'name_course', 'acronim', 'status']);
                        break;
                    case 'semestres':
                        data = await obtenerSemestres();
                        setHeaders(['id_semester', 'semester', 'status']);
                        break;
                    case 'curso_profesores':
                        data = await obtenerCursoProfesores();
                        setHeaders(['assignment_date', 'status', 'id_course', 'id_teacher']);
                        break;
                    case 'curso_estudiantes':
                        data = await obtenerCursoEstudiantes();
                        setHeaders(['enrollment_date', 'status', 'id_course', 'id_student']);
                        break;
                    case 'curso_semestres':
                        data = await obtenerCursoSemestre();
                        setHeaders(['start_date', 'end_date', 'status', 'id_course', 'id_semester']);
                        break;
                    case 'users':
                        data = await obtenerUsuarios();
                        setHeaders(['id_user', 'name', 'last_name', 'email', 'status', 'id_role']);
                        break;
                    case 'roles':
                        data = await obtenerRoles();
                        setHeaders(['id_role', 'name_role', 'status']);
                        break;
                }

                setDatos(data);
            } catch (error) {
                console.error("Error al cargar datos:", error.message);
            }
        };

        cargarDatos();
    }, [selectedTable]);

    const datosFiltrados = datos.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(busqueda.toLowerCase())
        )
    );

    
    //Actulizar Put
    const handleGuardarCambios = async () => {
        try {
            let endpoint = '';
            let idKey = '';

            switch (selectedTable) {
                case 'estudiantes':
                    endpoint = '/students/';
                    idKey = 'id_student';
                    break;
                case 'profesores':
                    endpoint = '/teachers/';
                    idKey = 'id_teacher';
                    break;
                case 'cursos':
                    endpoint = '/courses/';
                    idKey = 'id_course';
                    break;
                case 'semestres':
                    endpoint = '/semesters/';
                    idKey = 'id_semester';
                    break;
                case 'users':
                    endpoint = '/users/';
                    idKey = 'id_user';
                    break;
            }

            const dataActualizada = await fetchConToken(`${endpoint}${registroSeleccionado[idKey]}/`, {
                method: 'PUT',
                body: JSON.stringify(registroSeleccionado),
            });

            setDatos((prev) =>
                prev.map((item) =>
                    item[idKey] === dataActualizada[idKey] ? dataActualizada : item
                )
            );

            setRegistroSeleccionado(null);
            setModalVisto(false);

            
            setModalMensaje({
                tipo: 'success',
                titulo: 'Actualizado correctamente ',
                subtitulo: `El registro fue modificado.`,
            });
            setModalVisible(true);

        } catch (error) {
            console.error('Error en PUT:', error.message);

            
            setModalMensaje({
                tipo: 'error',
                titulo: 'Error al actualizar ',
                subtitulo: 'No se pudo modificar el registro.',
            });
            setModalVisible(true);
        }
    };



    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.containeScroll}>
                    {/* Tabs modernos */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
                        {opciones.map((opcion) => (
                            <TouchableOpacity
                                key={opcion.value}
                                onPress={() => setSelectedTable(opcion.value)}
                                style={[
                                    styles.tabButton,
                                    selectedTable === opcion.value && styles.tabButtonActive
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.tabButtonText,
                                        selectedTable === opcion.value && styles.tabButtonTextActive
                                    ]}
                                >
                                    {opcion.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Búsqueda */}
                    <TextInput
                        style={styles.input}
                        placeholder="Buscar por cualquier campo..."
                        value={busqueda}
                        onChangeText={setBusqueda}
                    />

                    {/* Tabla */}
                    <TablaComponente headers={headers} data={datosFiltrados} onRowPress={handleRowPress} />
                </ScrollView>
            </View>

            {/* Modal*/}
            {modalVisto && registroSeleccionado && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>✏️ Editar Registro</Text>

                        {headers.map((campo, index) => (
                            <TextInput
                                key={index}
                                style={styles.input}
                                value={registroSeleccionado[campo]?.toString() || ''}
                                onChangeText={(texto) =>
                                    setRegistroSeleccionado({ ...registroSeleccionado, [campo]: texto })
                                }
                                placeholder={campo}
                            />
                        ))}

                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity onPress={handleGuardarCambios} style={styles.saveButton}>
                                <Text style={styles.buttonText}>💾 Guardar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisto(false)} style={styles.cancelButton}>
                                <Text style={styles.buttonText}>❌ Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
            <ModalMensaje
                visible={modalVisible}
                tipo={modalMensaje.tipo}
                titulo={modalMensaje.titulo}
                subtitulo={modalMensaje.subtitulo}
                autoClose={true}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 7,
        paddingTop: 10,
        paddingHorizontal: 6,
        backgroundColor: '#fff'
    },
    containeScroll: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        gap: 5,
    },
    tabsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
        marginRight: 8,
    },
    tabButtonActive: {
        backgroundColor: '#4A90E2',
    },
    tabButtonText: {
        fontSize: 14,
        color: '#333',
    },
    tabButtonTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    saveButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
