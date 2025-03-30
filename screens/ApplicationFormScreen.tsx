import React, { useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { RootStackParamList } from '../navigation/AppNavigator';
import { validateEmail, validatePhoneNumber } from '../utils/validation';
import { ThemeContext } from '../context/ThemeContext';

type FormData = {
  name: string;
  email: string;
  contactNumber: string;
  reason: string;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ApplicationFormScreen'>;

const ApplicationFormScreen: React.FC<Props> = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    Alert.alert('Application Submitted', 'Thank you for applying!', [
      {
        text: 'Okay',
        onPress: () => {
          reset();
          navigation.popToTop();
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={[styles.formContainer, isDarkMode && styles.formContainerDark]}>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Name is required.' }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Name"
                style={[styles.input, isDarkMode && styles.inputDark]}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
            </>
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required.',
            validate: validateEmail || 'Invalid email format (letter@email.com).',
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Email"
                style={[styles.input, isDarkMode && styles.inputDark]}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </>
          )}
        />
        <Controller
          control={control}
          name="contactNumber"
          rules={{
            required: 'Contact Number is required.',
            validate: validatePhoneNumber || 'Invalid phone number. Only numbers allowed.',
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Contact Number"
                style={[styles.input, isDarkMode && styles.inputDark]}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
                placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
              />
              {errors.contactNumber && <Text style={styles.errorText}>{errors.contactNumber.message}</Text>}
            </>
          )}
        />
        <Controller
          control={control}
          name="reason"
          rules={{ required: 'Please tell us why you should be hired.' }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Why should we hire you?"
                style={[styles.input, styles.textArea, isDarkMode && styles.inputDark]}
                onChangeText={onChange}
                value={value}
                multiline
                placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
              />
              {errors.reason && <Text style={styles.errorText}>{errors.reason.message}</Text>}
            </>
          )}
        />
        <View style={[styles.buttonContainer, isDarkMode && styles.buttonContainerDark]}>
          <Button
            title="Submit Application"
            onPress={handleSubmit(onSubmit)}
            color={isDarkMode ? undefined : '#000'} // Black button in light mode
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  formContainerDark: {
    backgroundColor: '#222',
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    marginVertical: 8,
    borderRadius: 8,
    padding: 10,
  },
  inputDark: {
    backgroundColor: '#333',
    color: '#fff',
  },
  textArea: {
    height: 100,
  },
  buttonContainer: {
    marginTop: 16,
    backgroundColor: '#000', // Black button in light mode
    borderRadius: 5,
  },
  buttonContainerDark: {
    backgroundColor: 'transparent', // Default styling in dark mode
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default ApplicationFormScreen;
