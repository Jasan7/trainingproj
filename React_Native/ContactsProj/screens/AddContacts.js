import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {openDatabase} from 'react-native-sqlite-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

var ImagePicker = require('react-native-image-picker');

const db = openDatabase({
  name: 'rn_sqlite',
});

export default function AddContacts({getContacts}) {
  const [firstname, setFirstName] = useState('');
  const [landlinenum, setLandlineNumber] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    createTables();
  }, [isFavorite]);

  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, fname VARCHAR(20), pnum INT(10), lnum INT (10), isFavorite BOOLEAN, imageUri TEXT)',
        [],
        (sqlTxn, res) => {
          console.log('success');
        },
        error => {
          console.log('error' + error.message);
        },
      );
    });
  };

  const addRecord = () => {
    if (!firstname || !phonenumber) {
      Alert.alert('Attention', 'Add info to save contact', [{text: 'Okay'}]);
      return false;
    }

    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO contacts (fname, pnum, lnum, isFavorite, imageUri) VALUES (?, ?, ?, ?, ?)',
        [firstname, phonenumber, landlinenum, isFavorite, imageUri],
        (sqlTxn, res) => {
          console.log(`${firstname} added to contacts successfully`);
          Alert.alert(
            'Success',
            `${firstname} was added to your contacts successfully`,
            [{text: 'Okay'}],
          );
          setFirstName('');
          setPhoneNumber('');
          setLandlineNumber('');
          setIsFavorite(false);
          setImageUri(null);
          getContacts();
        },
        error => {
          console.log('error while adding a new contact' + error.message);
        },
      );
    });
  };
  const selectImage = () => {
    const options = {
      title: 'Select Image',
      mediaType: 'photo',
      includeBase64: false,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response.assets[0].uri);
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleFavorite = () => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    console.log(newIsFavorite);
    db.transaction(txn => {
      txn.executeSql(
        `UPDATE contacts SET isFavorite = ? WHERE id = ?`,
        [newIsFavorite, contactInfo.id],
        (sqlTxn, res) => {
          console.log('contact updated successfully ');
          getContacts();
        },
        error => {
          console.log('error while updating contact ' + error.message);
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.imagePickerContainer}>
          <TouchableOpacity onPress={selectImage}>
            {imageUri === null ? (
              <Icon name="camera-outline" size={48} color="grey" />
            ) : (
              <Image source={{uri: imageUri}} style={styles.imagePreview} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleFavorite} style={styles.favoriteIcon}>
          {/* Conditional rendering based on isFavorite */}
          {isFavorite ? (
            <Icon name="star" size={25} color="yellow" />
          ) : (
            <Icon name="star-outline" size={25} color="black" />
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstname}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="numeric"
          value={phonenumber}
          maxLength={10}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Landline Number"
          keyboardType="numeric"
          value={landlinenum}
          maxLength={10}
          onChangeText={setLandlineNumber}
        />
        <Pressable title="Save" style={styles.button} onPress={addRecord}>
          <Text style={styles.text}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  favoriteIcon: {
    position: 'absolute',
    zIndex: 1,
    right: 22,
    top: 10,
  },
  inputContainer: {
    padding: 10,
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginVertical: 8,
    borderBottomColor: 'skyblue',
    backgroundColor: 'white',
  },
  imagePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
    alignSelf: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'skyblue',
    marginTop: 10,
  },
});
