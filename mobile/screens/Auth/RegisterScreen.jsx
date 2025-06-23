import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'patient' // 'patient', 'nutritionist' ou 'trainer'
  });
  const { register } = useContext(AuthContext);
  
  const navigation = useNavigation();

async function handleRegister() {
   
  const result = await register(form);      // já faz login + guarda token
   if (result.success) {
       navigation.navigate('Main');          // vai direto p/ Home
   } else {
       alert(result.error || 'Erro ao registrar');
   }
  }

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (form.password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    // Implemente o registro aqui
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    navigation.navigate('Login');
  };

  const userTypes = [
    { label: 'Paciente', value: 'patient' },
    { label: 'Nutricionista', value: 'nutritionist' },
    { label: 'Educador Físico', value: 'trainer' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro no ForNutri</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={form.name}
        onChangeText={(text) => setForm({...form, name: text})}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => setForm({...form, email: text})}
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={form.password}
        onChangeText={(text) => setForm({...form, password: text})}
        secureTextEntry
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        value={form.confirmPassword}
        onChangeText={(text) => setForm({...form, confirmPassword: text})}
        secureTextEntry
      />
      
      <Text style={styles.sectionTitle}>Tipo de Usuário</Text>
      
      <View style={styles.userTypeContainer}>
        {userTypes.map((type) => (
          <TouchableOpacity
            key={type.value}
            style={[
              styles.userTypeButton,
              form.userType === type.value && styles.selectedUserType
            ]}
            onPress={() => setForm({...form, userType: type.value})}
          >
            <Text style={styles.userTypeText}>{type.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => navigation.navigate('Login')} // Navega para a tela de Login
      >
        <Text style={styles.secondaryButtonText}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}

// Mantenha os mesmos styles da versão anterior

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 12,
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  userTypeButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedUserType: {
    backgroundColor: '#E8F5E9',
    borderColor: '#2E7D32',
  },
  userTypeText: {
    color: '#333333',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#EEEEEE',
    marginVertical: 24,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
});