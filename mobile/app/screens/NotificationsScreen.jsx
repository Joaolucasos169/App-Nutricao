import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../api/api';
import { colors, fonts } from '../styles/theme';

export default function NotificationsScreen() {
  const [notificacoes, setNotificacoes] = useState([]);

  const carregarNotificacoes = async () => {
    try {
      // Substitua pela sua chamada API real
      const resposta = await api.get('/notificacoes');
      setNotificacoes(resposta.data);
    } catch (erro) {
      console.error('Erro ao carregar notificações:', erro);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarNotificacoes();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.text}>{item.mensagem}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notificacoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma notificação</Text>
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
  card: {
    backgroundColor: colors.white,
    padding: 15,
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.primary,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.textDark,
  },
  emptyText: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    color: colors.textLight,
    marginTop: 20,
  },
});
