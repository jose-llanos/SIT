import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Sidebar({ navigation }) {
    const menuItems = [
        { name: 'Dashboard', route: 'DashboardScreen' },
        { name: 'Team', route: 'TeamScreen' },
        { name: 'Projects', route: 'ProjectsScreen' },
        { name: 'Calendar', route: 'CalendarScreen' },
        { name: 'Documents', route: 'DocumentsScreen' },
        { name: 'Reports', route: 'ReportsScreen' },
    ];

    return (
        <View style={styles.sidebar}>
            {menuItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={() => navigation.navigate(item.route)}
                >
                    <Text style={styles.menuText}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    sidebar: {
        width: '25%',
        backgroundColor: '#1E90FF',
        paddingTop: 20,
    },
    menuItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    menuText: {
        color: '#fff',
        fontSize: 18,
    },
});
