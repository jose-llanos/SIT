import { useState } from 'react';
import { TextInput, View, StyleSheet, Platform, Pressable, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function InputComponente({ placeholder, value, onChangeText, type = 'text' }) {
    const [showPicker, setShowPicker] = useState(false);
    const [mode, setMode] = useState('date');
    const [tempDate, setTempDate] = useState(value ? new Date(value) : new Date());

    const handleChange = (event, selectedDate) => {
        if (selectedDate) {
            setTempDate(selectedDate);
            if (mode === 'date') {
                setMode('time'); // después de seleccionar la fecha, va la hora
                if (Platform.OS === 'ios') return; // en iOS se puede mostrar ambos
                setShowPicker(true);
            } else {
                setShowPicker(false);
                onChangeText(selectedDate.toISOString());
                setMode('date');
            }
        } else {
            setShowPicker(false);
            setMode('date');
        }
    };

    const formattedDateTime = tempDate.toLocaleString('es-CO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <View style={styles.inputContainer}>
            {type === 'date' ? (
                Platform.OS === 'web' ? (
                    <input
                        type="datetime-local"
                        value={value ? value.slice(0, 16) : ''}
                        onChange={(e) => {
                            const localValue = new Date(e.target.value);
                            setTempDate(localValue);
                            onChangeText(localValue.toISOString());
                        }}
                        style={styles.webInput}
                        placeholder={placeholder}
                    />
                ) : (
                    <>
                        <Pressable onPress={() => setShowPicker(true)} style={{ flex: 1 }}>
                            <Text style={styles.dateText}>
                                {value ? formattedDateTime : placeholder}
                            </Text>
                        </Pressable>
                        {showPicker && (
                            <DateTimePicker
                                value={tempDate}
                                mode={mode}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={handleChange}
                            />
                        )}
                    </>
                )
            ) : (
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor="#555"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        width: '80%',
        height: 45,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 6,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 8,
    },
    dateText: {
        fontSize: 16,
        color: '#333',
        paddingVertical: 8,
    },
    webInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        padding: 8,
        border: 'none',
        backgroundColor: 'transparent',
        color: '#333',
        outline: 'none', 
    },
});
