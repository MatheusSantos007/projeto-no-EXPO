import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

type Props = {
  message: string;
  visible: boolean;
};

export default function FeedbackToast({ message, visible }: Props) {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toast, { opacity }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});