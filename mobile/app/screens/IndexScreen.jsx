import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../styles/theme';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo} 
        resizeMode="container"
      />
      
      <Text style={styles.title}>Bem-vindo ao ForNutri</Text>
      <Text style={styles.subtitle}>Sua plataforma de acompanhamento nutricional</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
});