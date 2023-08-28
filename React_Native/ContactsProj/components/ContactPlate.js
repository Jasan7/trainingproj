import {View, Text, StyleSheet, Image} from 'react-native';
import {getColorByLetter} from '../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({
  name: 'rn_sqlite',
});

export default function ContactPlate({contactInfo}) {
  const color = getColorByLetter(contactInfo.fname[0]);

  return (
    <View style={styles.plate}>
      <View style={styles.info}>
        <View style={styles.forname}>
          <View style={{...styles.icon, backgroundColor: color}}>
            {contactInfo.imageUri ? (
              <Image
                source={{uri: contactInfo.imageUri}}
                style={styles.iconImage}
              />
            ) : (
              <Text style={styles.iconContent}>
                {contactInfo.fname[0].toUpperCase()}
              </Text>
            )}
          </View>
          <Text style={styles.fullName}>{contactInfo.fname}</Text>
        </View>
        <View style={styles.forfav}>
          <View style={styles.favoriteIcon}>
            {/* Conditional rendering based on isFavorite */}
            {contactInfo.isFavorite ? (
              <Icon name="star" size={25} color="yellow" />
            ) : (
              <Icon name="star-outline" size={25} color="transparent" />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
