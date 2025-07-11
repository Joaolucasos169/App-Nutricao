import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from './CompleteCadastro.styles';

const API_URL = 'http://10.0.30.176:3000'; // ou use process.env.API_URL

export default function CompleteCadastro() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    peso: '',
    altura: '',
    idade: '',
    foto: null,
    objetivo: '',
    restricoes: ''
  });

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Permita acesso à galeria para adicionar a foto.');
      }
    })();
  }, []);

  const escolherFoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.IMAGE, // corrigido
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setForm({ ...form, foto: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Erro ao abrir a galeria');
    }
  };

  const handleSalvar = async () => {
    if (!form.peso || !form.altura || !form.idade) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('@ForNutri:token');
      const user = JSON.parse(await AsyncStorage.getItem('@ForNutri:user'));

      let fotoUrl = form.foto;

      // Upload da imagem
      if (form.foto) {
        const formData = new FormData();
        formData.append('foto', {
          uri: form.foto,
          name: 'foto.jpg',
          type: 'image/jpeg',
        });

        const uploadResponse = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (!uploadResponse.ok) throw new Error('Falha no upload da foto');

        const uploadData = await uploadResponse.json();
        fotoUrl = uploadData.url;
      }

      const response = await fetch(`${API_URL}/api/cadastro/completar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: user.id,
          peso: parseFloat(form.peso),
          altura: parseFloat(form.altura),
          idade: parseInt(form.idade),
          foto: fotoUrl,
          objetivo: form.objetivo,
          restricoes: form.restricoes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao completar cadastro');
      }

      const updatedUser = { ...user, cadastro_completo: true };
      await AsyncStorage.setItem('@ForNutri:user', JSON.stringify(updatedUser));

      // ✅ Salvando nome e foto para uso na HomeScreen
      if (user.nome) {
        await AsyncStorage.setItem('userName', user.nome); // ou 'user.name' se for esse o campo
      }
      if (fotoUrl) {
        await AsyncStorage.setItem('userPhoto', fotoUrl);
      }

      Alert.alert('Sucesso', 'Cadastro completo!');
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });

    } catch (error) {
      console.error('Erro no cadastro completo:', error);
      Alert.alert('Erro', error.message || 'Erro ao salvar o cadastro');
    } finally {
      setLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Complete seu Cadastro</Text>

        <Text style={styles.label}>Peso (kg)*</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 70.5"
          keyboardType="numeric"
          value={form.peso}
          onChangeText={(text) => setForm({ ...form, peso: text })}
        />

        <Text style={styles.label}>Altura (cm)*</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 175"
          keyboardType="numeric"
          value={form.altura}
          onChangeText={(text) => setForm({ ...form, altura: text })}
        />

        <Text style={styles.label}>Idade*</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 30"
          keyboardType="numeric"
          value={form.idade}
          onChangeText={(text) => setForm({ ...form, idade: text })}
        />

        <Text style={styles.label}>Foto de Perfil</Text>
        <TouchableOpacity style={styles.fotoButton} onPress={escolherFoto}>
          <Text style={styles.fotoButtonText}>
            {form.foto ? 'Alterar Foto' : 'Adicionar Foto'}
          </Text>
        </TouchableOpacity>

        {form.foto && (
          <Image source={{ uri: form.foto }} style={styles.fotoPreview} />
        )}

        <Text style={styles.label}>Objetivo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Perder peso, ganhar massa"
          value={form.objetivo}
          onChangeText={(text) => setForm({ ...form, objetivo: text })}
        />

        <Text style={styles.label}>Restrições Alimentares</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Glúten, lactose"
          value={form.restricoes}
          onChangeText={(text) => setForm({ ...form, restricoes: text })}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSalvar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Salvar Cadastro</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

