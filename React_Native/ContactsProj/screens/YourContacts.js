import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ContactPlate from '../components/ContactPlate';
import {useIsFocused} from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const db = openDatabase({
  name: 'rn_sqlite',
});

export default function YourContacts({navigation}) {
  const [yourContacts, setYourContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    getContacts();
  }, [isFocused]);

  const getContacts = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM contacts ORDER BY id ASC`,
        [],
        (sqlTxn, res) => {
          console.log('contacts loaded successfully');
          let len = res.rows.length;
          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({
                id: item.id,
                fname: item.fname,
                pnum: item.pnum,
                lnum: item.lnum,
                isFavorite: item.isFavorite,
                imageUri: item.imageUri
              });
            }
            console.log(results);
            setYourContacts(results);
          }
        },
        error => {
          console.log('error while getting contacts ' + error.message);
        },
      );
    });
  };

  const searchContacts = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM contacts WHERE LOWER(fname) LIKE '%' || ? || '%' ORDER BY id ASC`,
        [searchQuery.toLowerCase()],
        (sqlTxn, res) => {
          console.log('contacts found ' + res.rows.length);
          let len = res.rows.length;
          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({
                id: item.id,
                fname: item.fname,
                pnum: item.pnum,
                lnum: item.lnum,
                isFavorite: item.isFavorite,
                imageUri: item.imageUri
              });
            }
            console.log('hello ' + results.isFavorite);
            getContacts();
            setFilteredContacts(results);
            
          } else {
            setFilteredContacts([]);
          }
        },
        error => {
          console.log('error while searching contacts ' + error.message);
        },
      );
      
    });
  };

  const handleSearchInputSubmit = text => {
    setFilteredContacts([]);
    // Call searchContacts function with the updated search query
    searchContacts(text);
  };

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
                    setYourContacts([]);
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

  return (
    <View style={styles.container}>
      <Icon
        name="person-add-outline"
        size={35}
        style={styles.addNewIcon}
        onPress={() => navigation.navigate('AddContacts', {getContacts})}
      />
      <View style={styles.searchInput}>
        <Icon name='search-circle-outline' size={40} color='skyblue'/>
        <TextInput
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          onSubmitEditing={e => handleSearchInputSubmit(e.nativeEvent.text)}
          placeholder="Search contacts..."
        />
      </View>

      <SwipeListView
        data={searchQuery ? filteredContacts : yourContacts}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ContactPlate contactInfo={item} />}
        renderHiddenItem={({item}) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft]}
              onPress={() => navigation.navigate('User', {contactInfo: item})}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  addNewIcon: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    zIndex: 1,
    color: 'blue',
    backgroundColor: 'skyblue',
    borderRadius: 60,
    width: 62,
    height: 62,
    padding: 11,
  },
  searchInput: {
    padding: 3,
    marginVertical: 6,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    flexDirection:'row',
    alignItems:'center'
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
