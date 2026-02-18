
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress, backgroundColor, textColor }) {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        styles.button,
        backgroundColor && { backgroundColor },
        styles, 
      ])}
      onPress={onPress}
    >
      <Text style={[styles.text, textColor && { color: textColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3376ff', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  text: {
    color: '#FFFFFF', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});
