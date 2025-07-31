import { View, Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native';

export default function TablaComponente({ headers, data, onRowPress }) {
    return (
        <View style={styles.tableContainer}>
            <View style={styles.headerRow}>
                {headers.map((header, index) => (
                    <Text key={index} style={styles.headerCell}>{header}</Text>
                ))}
            </View>

            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onRowPress(item)}>
                        <View style={styles.dataRow}>
                            {headers.map((key, colIndex) => (
                                <Text key={colIndex} style={styles.dataCell}>
                                    {item[key] || '---'}
                                </Text>
                            ))}
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    tableContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
        elevation: 2,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerCell: {
        flex: 1,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 13,
        color: '#555',
    },
    dataRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dataCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 13,
        color: '#333',
    },
});
