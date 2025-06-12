import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import api from '../api/api';
import { useFocusEffect } from '@react-navigation/native';
import { colors, fonts } from '../styles/theme';

export default function PlanosAlimentarScreen() {
  const [planos, setPlanos] = useState([]);
  const router = useRouter();

  const carregarPlanos = async () => {
    try {
      // Substitua pela sua chamada API real
      const resposta = await api.get('/planos-alimentar');
      setPlanos(resposta.data);
    } catch (erro) {
      console.error('Erro ao carregar planos alimentares:', erro);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarPlanos();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.info}>Duração: {item.duracao} dias</Text>
      <Text style={styles.info}>Calorias: {item.calorias}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.detailsButton]}
          onPress={() => router.push({ pathname: '/detalhes-plano', params: { planoId: item.id } })}
        >
          <Text style={styles.buttonText}>Detalhes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.newButton} onPress={() => router.push('/novo-plano')}>
        <Ionicons name="add-circle-outline" size={24} color={colors.white} />
        <Text style={styles.newButtonText}>Novo Plano Alimentar</Text>
      </TouchableOpacity>

      <FlatList
        data={planos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum plano alimentar cadastrado</Text>
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
