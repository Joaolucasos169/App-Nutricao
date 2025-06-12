import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../styles/theme';

export default function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('paciente');
  const navigation = useNavigation();

  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    Alert.alert('Sucesso', `Usuário ${nome} cadastrado como ${tipo}.`);
    navigation.navigate('Login'); // Substitua pelo nome da tela de login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro no ForNutri</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor={colors.textLight}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.textLight}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={colors.textLight}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TextInput
        style={styles.input}
        placeholder="Confimar Senha"
        placeholderTextColor={colors.textLight}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={styles.label}>Tipo de Usuário</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity 
          style={[styles.radioButton, tipo === 'paciente' && styles.radioSelected]}
          onPress={() => setTipo('paciente')}
        >
          <Text style={styles.radioText}>Paciente</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.radioButton, tipo === 'nutricionista' && styles.radioSelected]}
          onPress={() => setTipo('nutricionista')}
        >
          <Text style={styles.radioText}>Nutricionista</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.link}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    marginBottom: 20,
    color: colors.primary,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginBottom: 15,
    color: colors.textDark,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.bold,
    marginBottom: 8,
    color: colors.textDark,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  radioButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  radioSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  radioText: {
    fontFamily: fonts.regular,
    color: colors.textDark,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  link: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: 16,
    fontFamily: fonts.regular,
    textDecorationLine: 'underline',
  },
});