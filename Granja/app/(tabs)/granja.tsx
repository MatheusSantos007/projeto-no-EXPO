import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  FlatList,
  Linking
} from 'react-native';

type EggProduct = {
  id: string;
  name: string;
  type: 'branco' | 'vermelho' | 'caipira' | 'orgânico';
  price: number;
  quantity: number;
  image: string;
  benefits?: string[];
};

export default function EggFarmScreen() {
  const [cart, setCart] = useState<EggProduct[]>([]);
  
  const products: EggProduct[] = [
    {
      id: '1',
      name: 'Ovos Caipira',
      type: 'caipira',
      price: 15.90,
      quantity: 30,
      image: 'https://images.unsplash.com/photo-1585355611266-f01530088d60?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      benefits: [
        'Galinhas criadas soltas',
        'Alimentação natural',
        'Maior concentração de nutrientes',
        'Casca mais resistente'
      ]
    },
    
  ];

  const addToCart = (product: EggProduct) => {
    setCart([...cart, product]);
  };

  const openWhatsApp = () => {
    Linking.openURL('whatsapp://send?phone=SEUNUMERO&text=Olá, gostaria de saber mais sobre os ovos!');
  };

  return (
    <ScrollView style={styles.container}>
      {}
      <View style={styles.presentation}>
        <Text style={styles.sectionTitle}>Nossa Qualidade</Text>
        <Image 
          source={{ uri: 'https://plus.unsplash.com/premium_photo-1661962640513-1a6fdec06b7e?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} 
          style={styles.farmImage}
        />
        <Text style={styles.presentationText}>
          Nossos ovos caipiras são produzidos por galinhas criadas livres, 
          com alimentação natural e sem hormônios. Uma diferença que você 
          sente no sabor e vê na cor intensa da gema!
        </Text>
        
        <View style={styles.qualityBadges}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>100% Natural</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Sem Antibióticos</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Fresco Diariamente</Text>
          </View>
        </View>
      </View>

      {}
      <View style={styles.differentials}>
        <Text style={styles.sectionTitle}>Por que nossos ovos são especiais?</Text>
        <View style={styles.differentialItem}>
          <Text style={styles.differentialIcon}>🌱</Text>
          <Text style={styles.differentialText}>Galinhas criadas soltas com acesso a pastagem</Text>
        </View>
        <View style={styles.differentialItem}>
          <Text style={styles.differentialIcon}>🥬</Text>
          <Text style={styles.differentialText}>Alimentação balanceada com milho e verduras</Text>
        </View>
        <View style={styles.differentialItem}>
          <Text style={styles.differentialIcon}>❤️</Text>
          <Text style={styles.differentialText}>Produção familiar com tratamento ético</Text>
        </View>
      </View>

      {}
      <Text style={styles.sectionTitle}>Nossos Produtos</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productType}>Tipo: {item.type}</Text>
              <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
              
              {item.benefits && (
                <View style={styles.benefitsContainer}>
                  {item.benefits.map((benefit, index) => (
                    <Text key={index} style={styles.benefitText}>✓ {benefit}</Text>
                  ))}
                </View>
              )}
            </View>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => addToCart(item)}>
              <Text style={styles.buttonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />

      {}
      <View style={styles.contact}>
        <Text style={styles.contactTitle}>Entre em Contato</Text>
        <Text style={styles.contactText}>Dúvidas ou encomendas especiais:</Text>
        <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsApp}>
          <Text style={styles.whatsappText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
  },
  presentation: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  farmImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  presentationText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495e',
    marginBottom: 12,
  },
  qualityBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  badge: {
    backgroundColor: '#e8f5e9',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  badgeText: {
    color: '#2e7d32',
    fontSize: 12,
    fontWeight: '500',
  },
  differentials: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  differentialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  differentialIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  differentialText: {
    flex: 1,
    fontSize: 14,
    color: '#0d47a1',
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2c3e50',
  },
  productType: {
    fontSize: 13,
    color: '#7f8c8d',
    marginVertical: 2,
  },
  productPrice: {
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 6,
  },
  benefitsContainer: {
    marginTop: 6,
  },
  benefitText: {
    fontSize: 12,
    color: '#16a085',
    marginBottom: 3,
  },
  addButton: {
    backgroundColor: '#e67e22',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  contact: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
    alignItems: 'center',
  },
  contactTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: '#2c3e50',
  },
  contactText: {
    textAlign: 'center',
    marginBottom: 12,
    color: '#7f8c8d',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  whatsappText: {
    color: 'white',
    fontWeight: 'bold',
  },
});