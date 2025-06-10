import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Picker } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts } from './styles/theme';

export default function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [profissao, setProfissao] = useState('');
  const [salario, setSalario] = useState('');
  const [tipo, setTipo] = useState('comum');
  const router = useRouter();

  const handleCadastro = () => {
    if (!nome || !profissao || !salario || !tipo) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    Alert.alert('Sucesso', `Usuário ${nome} cadastrado como ${tipo}.`);
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor={colors.textLight}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Profissão"
        placeholderTextColor={colors.textLight}
        value={profissao}
        onChangeText={setProfissao}
      />

      <TextInput
        style={styles.input}
        placeholder="Salário"
        placeholderTextColor={colors.textLight}
        keyboardType="numeric"
        value={salario}
        onChangeText={setSalario}
      />

      <Text style={styles.label}>Tipo de Usuário</Text>
      <Picker
        selectedValue={tipo}
        onValueChange={(itemValue) => setTipo(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Comum" value="comum" />
        <Picker.Item label="Nutricionista" value="nutricionista" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.bold,
  },
});