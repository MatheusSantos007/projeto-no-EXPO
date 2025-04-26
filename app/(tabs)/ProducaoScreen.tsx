import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ModalProducao from '../../components/modals/ModalProducao';
import FeedbackToast from '../../components/Feedback/FeedbackToast';
import { Producao } from '../../interfaces/Producao';

export default function ProducaoScreen() {
  const [producoes, setProducoes] = useState<Producao[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const adicionarProducao = (nova: Producao) => {
    setProducoes([...producoes, nova]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const ordenarPorData = (producoes: Producao[]) => {
    return [...producoes].sort((a, b) => {
      const [diaA, mesA, anoA] = a.data.split('/').map(Number);
      const [diaB, mesB, anoB] = b.data.split('/').map(Number);
      return new Date(anoB, mesB - 1, diaB).getTime() - new Date(anoA, mesA - 1, diaA).getTime();
    });
  };

  const ListaVazia = () => (
    <View style={styles.containerVazio}>
      <Text style={styles.vazio}>Nenhuma produção cadastrada.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas Produções</Text>

      <FlatList
        data={ordenarPorData(producoes)}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<ListaVazia />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.tipo}>{item.tipo}</Text>
            <Text style={styles.info}>Quantidade: {item.quantidade}</Text>
            <Text style={styles.info}>Data: {item.data}</Text>
          </View>
        )}
        contentContainerStyle={producoes.length === 0 ? styles.listaVaziaContainer : null}
      />

      <TouchableOpacity style={styles.botaoAdicionar} onPress={() => setModalVisible(true)}>
        <Text style={styles.textoBotao}>+ Nova Produção</Text>
      </TouchableOpacity>

      <ModalProducao
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={adicionarProducao}
      />

      <FeedbackToast 
        message="Produção cadastrada com sucesso!" 
        visible={showToast} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  containerVazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  listaVaziaContainer: {
    flexGrow: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  vazio: {
    textAlign: 'center',
    color: '#7f8c8d',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  tipo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
  info: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  botaoAdicionar: {
    backgroundColor: '#2980b9',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});