import { AsyncStorage } from 'react-native-community/async-storage';

setPhoneNumber = async (phoneNumber) => {
    try {
      await AsyncStorage.setItem(
        'phoneNumber',
        phoneNumber
      );
    } catch (error) {
      // Error saving data
    }
  };

  