import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useState} from 'react';

const App = () => {
  const [result, setResult] = useState('');

  const buttonPressed = text => {
    if (text === '=') {
      calculateResult();
    } else if (text === '%') {
      applyPercentage();
    } else if (text === '(' || text === ')') {
      setResult(prevResult => prevResult + text);
    } else if (text === 'backspace') {
      setResult(prevResult => prevResult.slice(0, -1));
    } else {
      if (text === '-') {
        // Allow negative operator as the first character
        setResult(prevResult => prevResult + text);
      } else if (/\d|\./.test(text)) {
        // Allow numbers and decimal point
        setResult(prevResult => prevResult + text);
      } else if (/[-+*/%]/.test(text)) {
        // Allow operators if there is a preceding number or closing bracket
        setResult(prevResult => prevResult + text);
      }
    }
  };
  

  const applyPercentage = () => {
    if (/\d$/.test(result)) {
      // If there is a preceding number, divide it by 100 to get the percentage
      const calculatedResult = eval(result + '/100');
      setResult(calculatedResult.toString());
    }
  };

  const calculateResult = () => {
    let calculatedResult = '';
    try {
      const expressionWithBrackets = addBrackets(result);
      calculatedResult = eval(expressionWithBrackets);
    } catch (error) {
      calculatedResult = 'Error';
    }
    setResult(calculatedResult);
  };

  const addBrackets = expression => {
    let openingBracketsCount = 0;
    let closingBracketsCount = 0;

    // Count the number of opening and closing brackets in the expression
    for (let i = 0; i < expression.length; i++) {
      if (expression[i] === '(') {
        openingBracketsCount++;
      } else if (expression[i] === ')') {
        closingBracketsCount++;
      }
    }
    let bracketsToAdd = openingBracketsCount - closingBracketsCount;
    if (bracketsToAdd > 0) {
      expression += ')'.repeat(bracketsToAdd);
    }
    return expression;
  };

  const clearResult = () => {
    setResult('');
  };

  let rows = [];
  let nums = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['.', 0, '='],
  ];
  for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row.push(
        <TouchableOpacity
          key={nums[i][j]}
          onPress={() => buttonPressed(nums[i][j])}
          style={styles.button}>
          <Text style={styles.buttonText}>{nums[i][j]}</Text>
        </TouchableOpacity>,
      );
    }
    rows.push(
      <View key={i} style={styles.row}>
        {row}
      </View>,
    );
  }

  let operations = ['+', '-', '*', '/', '%'];
  let ops = [];
  for (let i = 0; i < 5; i++) {
    ops.push(
      <TouchableOpacity
        key={operations[i]}
        onPress={() => buttonPressed(operations[i])}
        style={styles.button}>
        <Text style={[styles.buttonText, styles.operationText]}>
          {operations[i]}
        </Text>
      </TouchableOpacity>,
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.leftcol}>
          <TouchableOpacity onPress={clearResult} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => buttonPressed('(')}
            style={styles.buttonBrackets} // Style for the '(' button
          >
            <Text style={styles.buttonText}>(</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => buttonPressed(')')}
            style={styles.buttonBrackets} // Style for the ')' button
          >
            <Text style={styles.buttonText}>)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => buttonPressed('backspace')}
            style={styles.backButton}>
            <Text style={styles.backButtonText}>⌫</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.numbers}>{rows}</View>
        <View style={styles.operations}>{ops}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  result: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingBottom: 17
  },
  resultText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttons: {
    flex: 4,
    flexDirection: 'row',
  },
  leftcol: {
    flex: 1,
    flexDirection: 'column',
  },
  numbers: {
    flex: 3,
    backgroundColor: '#434343',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
  operations: {
    flex: 1,
    backgroundColor: '#636363',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  operationText: {
    fontSize: 24,
    color: '#fff',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#f4511e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#f4511e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  buttonBrackets: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#636363',
  },
});

export default App;
