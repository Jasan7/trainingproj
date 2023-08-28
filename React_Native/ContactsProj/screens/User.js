import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {openDatabase} from 'react-native-sqlite-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

var ImagePicker = require('react-native-image-picker');

const db = openDatabase({
  name: 'rn_sqlite',
});

export default function User({route}) {
  const [firstname, setFirstName] = useState(route.params.contactInfo.fname);
  const [landlinenum, setLandlineNumber] = useState(
    route.params.contactInfo.lnum.toString(),
  );
  const [phonenumber, setPhoneNumber] = useState(
    route.params.contactInfo.pnum.toString(),
  );
  const [imageUri, setImageUri] = useState(route.params.contactInfo.imageUri);
  const [isFavorite, setIsFavorite] = useState(route.params.contactInfo.isFavorite);

  useEffect(() => {
    if (route.params?.contact) {
      setFirstName(route.params.contact.fname);
      setPhoneNumber(route.params.contact.pnum.toString());
      setLandlineNumber(route.params.contact.lnum.toString());
      setImageUri(route.params.contact.imageUri);
      setIsFavorite(route.params.contact.isFavorite);
    }
  }, [isFavorite]);

  const updateRecord = () => {
    db.transaction(txn => {
      txn.executeSql(
        `UPDATE contacts SET fname=?, pnum=?, lnum=?, imageUri=?, isFavorite=? WHERE id=?`,
        [
          firstname,
          phonenumber,
          landlinenum,
          imageUri,
          isFavorite,
          route.params.contactInfo.id,
        ],
        (sqlTxn, res) => {
          console.log(`${firstname} updated in contacts successfully`);
          Alert.alert('Success', 'Contact was updated successfully', [
            {text: 'Okay'},
          ]);
          setFirstName('');
          setPhoneNumber('');
          setLandlineNumber('');
          setIsFavorite(false);
          setImageUri(null);
          getContacts();
        },
        error => {
          console.log('error while updating a contact' + error.message);
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
          {imageUri !== null && (
            <TouchableOpacity onPress={() => setImageUri(null)}>
              <Icon name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          )}
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
        <Pressable title="update" style={styles.button} onPress={updateRecord}>
          <Text style={styles.text}>Update</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  favoriteIcon: {
    position: 'absolute',
    zIndex: 1,
    right: 22,
    top: 10,
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
});
