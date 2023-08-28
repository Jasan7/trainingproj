import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {getColorByLetter} from '../utils/index';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

const db = openDatabase({
  name: 'rn_sqlite',
});

export default function FavoriteContacts() {
  const [favoriteContacts, setFavoriteContacts] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  
  const checkTableExists = (db, tableName) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `PRAGMA table_info(${tableName})`,
          [],
          (tx, results) => {
            // Check if results.rows.length > 0, which means the table exists
            if (results.rows.length > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          error => {
            reject(error);
          },
        );
      });
    });
  };

  useEffect(() => {
    // Open the SQLite database
    const db = openDatabase({name: 'rn_sqlite', createFromLocation: 1});

    // Fetch contacts with isFavorite property set to true
    checkTableExists(db, 'contacts').then(tableExists => {
      if (tableExists) {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM contacts WHERE isFavorite = ?',
            [1], // Pass 1 to fetch contacts with isFavorite property set to true
            (tx, results) => {
              const rows = results.rows;
              const contacts = [];
              for (let i = 0; i < rows.length; i++) {
                contacts.push(rows.item(i));
              }
              setFavoriteContacts(contacts);
            },
            error => {
              // Handle case where no results are returned
              if (
                error.message === 'No rows affected!' ||
                error.message === 'No results were returned by the query.'
              ) {
                // Set favorite contacts to an empty array
                setFavoriteContacts([]);
              } else {
                console.error('Error fetching favorite contacts: ', error);
              }
            },
          );
        });
      } else {
        console.log("table doesn't exist");
      }
    });
  }, [isFocused]);

  const handleDelete = item => {
    Alert.alert(
      'Delete Contact',
      `Are you sure you want to delete ${item.fname} from your contacts?`,
      [
        {
          text: "No Don't Delete",
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            db.transaction(txn => {
              txn.executeSql(
                `DELETE FROM contacts WHERE id = ?`,
                [item.id],
                (sqlTxn, res) => {
                  console.log('contact deleted successfully ' + item.id);
                  let len = res.rows.length;
                  if (len == 0) {
                    setFavoriteContacts([]);
                  }
                  getContacts();
                },
                error => {
                  console.log('error while deleting contact ' + error.message);
                },
              );
            });
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const renderItem = ({item}) => {
    const color = getColorByLetter(item.fname[0]);

    return (
      <View style={styles.plate}>
        <View style={styles.info}>
          <View style={styles.forname}>
            <View style={{...styles.icon, backgroundColor: color}}>
              {item.imageUri ? (
                <Image source={{uri: item.imageUri}} style={styles.iconImage} />
              ) : (
                <Text style={styles.iconContent}>
                  {item.fname[0].toUpperCase()}
                </Text>
              )}
            </View>
            <Text style={styles.fullName}>{item.fname}</Text>
          </View>
          <View style={styles.forfav}>
            <View style={styles.favoriteIcon}>
              {/* Conditional rendering based on isFavorite */}
              {item.isFavorite ? (
                <Icon name="star" size={25} color="yellow" />
              ) : (
                <Icon name="star-outline" size={25} color="transparent" />
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      {favoriteContacts.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptytext}>No favorite contacts found</Text>
        </View>
      ) : (
        <SwipeListView
          data={favoriteContacts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          renderHiddenItem={({item}) => (
            <View style={styles.rowBack}>
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() =>
                  navigation.navigate('User', {contactInfo: item})
                }>
                <Icon name="create-outline" size={25} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => handleDelete(item)}>
                <Icon name="trash-outline" size={25} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.backLeftBtn, styles.backLeftBtnLeft]}
                onPress={() =>
                  navigation.navigate('Profile', {contactInfo: item})
                }>
                <Icon name="person-circle-outline" size={25} color="black" />
              </TouchableOpacity>
            </View>
          )}
          rightThreshold={-145}
          leftOpenValue={157}
          leftThreshold={90}
          rightOpenValue={-90}
          disableLeftSwipe={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptytext: {
    fontSize: 17,
  },
  plate: {
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  iconImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forname: {
    width: 315,
    flexDirection: 'row',
    alignItems: 'center',
  },
  forfav: {
    width: 35,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  fullName: {
    fontSize: 19,
  },
  iconContent: {
    flex: 1,
    paddingVertical: 4,
    fontSize: 20,
    color: 'white',
  },
  icon: {
    borderRadius: 25,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    width: 35,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginRight: 235,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 68,
    margin: 8,
    borderRadius: 25,
  },
  backLeftBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 68,
    margin: 8,
    borderRadius: 25,
  },
  backRightBtnLeft: {
    backgroundColor: '#ffc110',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'coral',
    right: 0,
  },
  backLeftBtnLeft: {
    backgroundColor: '#fff099',
    left: 310,
  },
});
