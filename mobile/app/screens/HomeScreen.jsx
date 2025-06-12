import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../api/api';
import { colors, fonts } from '../styles/theme';

export default function Home() {
  const [pacientes, setPacientes] = useState([]);
  const navigation = useNavigation();

  const carregarPacientes = async () => {
    try {
      // Substitua pela sua chamada API real
      const resposta = await api.get('/pacientes');
      setPacientes(resposta.data);
    } catch (erro) {
      console.error('Erro ao carregar pacientes:', erro);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarPacientes();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.info}>Idade: {item.idade} anos</Text>
      <Text style={styles.info}>IMC: {item.imc}</Text>
      <Text style={styles.info}>Plano Alimentar: {item.plano_alimentar ? 'Ativo' : 'Não definido'}</Text>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.detailsButton]}
          onPress={() => navigation.navigate('Detalhes', { pacienteId: item.id })}
        >
          <Text style={styles.buttonText}>Detalhes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.planButton]}
          onPress={() => navigation.navigate('Plano', { pacienteId: item.id })}
        >
          <Text style={styles.buttonText}>Plano</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.newButton} onPress={() => router.push('/novo-paciente')}>
        <Ionicons name="add-circle-outline" size={24} color={colors.white} />
        <Text style={styles.newButtonText}>Novo Paciente</Text>
      </TouchableOpacity>

      <FlatList
        data={pacientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum paciente cadastrado</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
    flex: 1,
  },
  newButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  newButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.bold,
    marginLeft: 10,
  },
  card: {
    backgroundColor: colors.white,
    padding: 20,
    marginTop: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nome: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.primary,
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.textDark,
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  detailsButton: {
    backgroundColor: colors.primaryLight,
  },
  planButton: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    color: colors.textLight,
    marginTop: 20,
  },
});