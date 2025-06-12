import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../styles/theme';

export default function AdminScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel de Administração</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/gestao-pacientes')}
      >
        <Ionicons name="person" size={24} color={colors.white} />
        <Text style={styles.buttonText}>Gerenciar Pacientes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/gestao-planos')}
      >
        <Ionicons name="file-tray" size={24} color={colors.white} />
        <Text style={styles.buttonText}>Gerenciar Planos Alimentares</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.primary,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.bold,
    marginLeft: 10,
  },
});
