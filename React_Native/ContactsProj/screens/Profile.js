import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {openDatabase} from 'react-native-sqlite-storage';
import {getContacts} from '../screens/YourContacts';
import {getColorByLetter} from '../utils';

const db = openDatabase({
  name: 'rn_sqlite',
});

export default function Profile({route}) {
  console.log(route);
  const {contactInfo} = route.params;
  console.log(contactInfo.isFavorite);
  const [isFavorite, setIsFavorite] = useState(contactInfo.isFavorite);
  const {fname, pnum, lnum, imageUri} = contactInfo;
  const color = getColorByLetter(fname[0]);

  useEffect(() => {}, [isFavorite]);

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
      {imageUri ? (
        <View style={styles.backgroundText}>
          <ImageBackground
            source={{uri: imageUri}}
            borderRadius={50}
            style={styles.backgroundImage}
            >             
          </ImageBackground>
          <Text style={styles.text}>{fname}</Text>
        </View>
      ) : (
        <View style={styles.backgroundText}>
          <Text style={{...styles.textbg, backgroundColor: color}}>
            {fname[0].toUpperCase()}
          </Text>
          <Text style={styles.text}>{fname}</Text>
        </View>
      )}
      <View style={{flex: 1, margin: 10}}>
        <View style={styles.phonenNumberContainer}>
          <Text style={styles.phonenumber}>{pnum}</Text>
          <TouchableOpacity onPress={handleFavorite} style={{width: 45}}>
            {/* Conditional rendering based on isFavorite */}
            {isFavorite ? (
              <Icon name="star" size={25} color="yellow" />
            ) : (
              <Icon name="star-outline" size={25} color="black" />
            )}
          </TouchableOpacity>
          <Icon
            name="call"
            size={28}
            color="green"
            onPress={() => console.log('call function')}
          />
        </View>
        {lnum && <Text style={styles.btext}>Landline Number: {lnum}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  phonenumber: {
    fontSize: 16,
    marginLeft: 10,
    width: 278,
    paddingTop: 3,
  },
  textbg: {
    fontSize: 70,
    borderRadius: 50,
    width: 100,
    height: 100,
    paddingHorizontal: 29,
    color: 'white',
  },
  backgroundImage: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100
  },
  backgroundText: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  btext: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  phonenNumberContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
    elevation: 5,
    paddingVertical: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  text: {
    position: 'absolute',
    top: 205,
    left: 20,
    fontSize: 30,
    fontWeight: 'bold',
    zIndex: 1,
  },
});
