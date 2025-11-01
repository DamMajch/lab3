import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);

  const handlePress = (value) => {
    if (display === '0' || (operator && firstValue === display)) {
      setDisplay(value.toString());
    } else {
      setDisplay(display + value);
    }
  };

  const handleOperator = (op) => {
    setFirstValue(display);
    setOperator(op);
  };

  const calculate = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(display);
    let result = 0;

    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '×':
        result = num1 * num2;
        break;
      case '÷':
        result = num2 !== 0 ? num1 / num2 : 'Błąd';
        break;
      default:
        return;
    }
    setDisplay(result.toString());
    setOperator(null);
    setFirstValue(null);
  };

  const clear = () => {
    setDisplay('0');
    setFirstValue(null);
    setOperator(null);
  };

  return (
    <View style={styles.container}>
      {/* Ekran */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{display}</Text>
      </View>

      {/* Przyciski */}
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonGray} onPress={clear}>
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          <View style={styles.buttonGray} />
          <View style={styles.buttonGray} />
          <TouchableOpacity style={styles.buttonOrange} onPress={() => handleOperator('÷')}>
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {[7, 8, 9].map((num) => (
            <TouchableOpacity key={num} style={styles.buttonGray} onPress={() => handlePress(num)}>
              <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.buttonOrange} onPress={() => handleOperator('×')}>
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {[4, 5, 6].map((num) => (
            <TouchableOpacity key={num} style={styles.buttonGray} onPress={() => handlePress(num)}>
              <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.buttonOrange} onPress={() => handleOperator('-')}>
            <Text style={styles.buttonText}>−</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {[1, 2, 3].map((num) => (
            <TouchableOpacity key={num} style={styles.buttonGray} onPress={() => handlePress(num)}>
              <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.buttonOrange} onPress={() => handleOperator('+')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.buttonGray, { flex: 2 }]} onPress={() => handlePress(0)}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGray} onPress={() => handlePress('.')}>
            <Text style={styles.buttonText}>,</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOrange} onPress={calculate}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  displayContainer: {
    flex: 2,
    backgroundColor: '#333',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    fontSize: 60,
    color: '#fff',
  },
  buttonsContainer: {
    flex: 5,
    backgroundColor: '#000',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  buttonGray: {
    flex: 1,
    backgroundColor: '#505050',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
  },
  buttonOrange: {
    flex: 1,
    backgroundColor: '#ff9500',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
  },
  buttonText: {
    fontSize: 28,
    color: '#fff',
  },
});
