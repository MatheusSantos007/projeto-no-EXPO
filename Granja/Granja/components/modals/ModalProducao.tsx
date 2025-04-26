import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Keyboard } from 'react-native';
import { Producao } from '../../interfaces/Producao';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (nova: Producao) => void;
};

export default function ModalProducao({ visible, onClose, onSave }: Props) {
  const [tipo, setTipo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [data, setData] = useState('');

  const limparCampos = () => {
    setTipo('');
    setQuantidade('');
    setData('');
  };

  const formatarData = (input: string) => {
    
    let nums = input.replace(/\D/g, '');
    
   
    if (nums.length > 2) nums = `${nums.slice(0, 2)}/${nums.slice(2)}`;
    if (nums.length > 5) nums = `${nums.slice(0, 5)}/${nums.slice(5, 9)}`;
    
    return nums;
  };

  const validarData = (dataStr: string) => {
    const [dia, mes, ano] = dataStr.split('/').map(Number);
    if (!dia || !mes || !ano) return false;
    
    const dataObj = new Date(ano, mes - 1, dia);
    return (
      dataObj.getDate() === dia &&
      dataObj.getMonth() === mes - 1 &&
      dataObj.getFullYear() === ano
    );
  };

  const salvar = () => {
    Keyboard.dismiss();
    
    if (!tipo || !quantidade || !validarData(data)) return;

    const nova: Producao = {
      id: Date.now().toString(),
      tipo,
      quantidade: Number(quantidade),
      data, 
    };

    onSave(nova);
    limparCampos();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.fundo}>
        <View style={styles.modal}>
          <Text style={styles.titulo}>Nova Produção</Text>

          <TextInput
            style={styles.input}
            placeholder="Tipo (ex: Grande)"
            value={tipo}
            onChangeText={setTipo}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade (ex: 100)"
            value={quantidade}
            onChangeText={(text) => /^\d*$/.test(text) && setQuantidade(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Data (DD/MM/AAAA)"
            value={data}
            onChangeText={(text) => setData(formatarData(text))}
            keyboardType="numeric"
            maxLength={10}
          />

          <TouchableOpacity style={styles.botaoSalvar} onPress={salvar}>
            <Text style={styles.textoBotao}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  botaoSalvar: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelar: {
    marginTop: 10,
    textAlign: 'center',
    color: '#7f8c8d',
  },
});
