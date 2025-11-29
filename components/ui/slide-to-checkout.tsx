import { CURRENCY } from "@/constants";
import { useCartContext } from "@/hooks/use-cart";
import { ArrowRight, Check } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  View,
} from "react-native";
import { Typography } from "../elements";

interface SlideToCheckoutProps {
  total: number;
  onCheckout: () => void;
  disabled?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');
const SLIDER_WIDTH = screenWidth - 32;
const BUTTON_WIDTH = 60;
const SLIDE_THRESHOLD = SLIDER_WIDTH - BUTTON_WIDTH - 20;

export default function SlideToCheckout({ 
  total, 
  onCheckout, 
  disabled = false 
}: SlideToCheckoutProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  const { onCheckoutFromCart } = useCartContext()

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => !disabled && !isCompleted,
      onPanResponderGrant: () => {
        setIsSliding(true);
      },
      onPanResponderMove: (evt, gestureState) => {
        const { dx } = gestureState;
        if (dx >= 0 && dx <= SLIDE_THRESHOLD) {
          translateX.setValue(dx);
          setIsSliding(dx > 10);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx } = gestureState;
        
        if (dx >= SLIDE_THRESHOLD) {
          Animated.timing(translateX, {
            toValue: SLIDE_THRESHOLD,
            duration: 200,
            useNativeDriver: false,
          }).start(async () => {
            setIsCompleted(true);
            onCheckoutFromCart()
          });
        } else {
          resetSlider();
        }
      },
    })
  ).current;

  const resetSlider = () => {
    setIsSliding(false);
    setIsCompleted(false);
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const sliderOpacity = translateX.interpolate({
    inputRange: [0, SLIDE_THRESHOLD],
    outputRange: [1, 0.3],
    extrapolate: 'clamp',
  });

  return (
    <View className="mx-4 mb-6">
      <View 
        className="bg-primary rounded-2xl h-16 flex-row items-center justify-between px-4 relative overflow-hidden"
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        {/* Background text */}
        <Animated.View 
          className="flex-row items-center justify-center flex-1"
          style={{ opacity: sliderOpacity }}
        >
          <Typography.Base className="text-white font-semibold mr-2">
            {isSliding ? `Slide to Checkout ${CURRENCY}${total}` : `Slide to checkout • ${CURRENCY}${total}`}
          </Typography.Base>
        </Animated.View>

        {/* Sliding button */}
        <Animated.View
          className="absolute left-2 w-14 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg"
          style={{
            transform: [{ translateX }],
          }}
          {...panResponder.panHandlers}
        >
          {isCompleted ? (
            <Check size={24} color="#22c55e" strokeWidth={3} />
          ) : (
            <ArrowRight 
              size={24} 
              color="#C85A2B" 
              strokeWidth={2.5}
            />
          )}
        </Animated.View>

        {/* Slide progress indicator */}
        <Animated.View
          className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
          style={{
            width: translateX.interpolate({
              inputRange: [0, SLIDE_THRESHOLD],
              outputRange: [0, SLIDER_WIDTH],
              extrapolate: 'clamp',
            }),
          }}
        />
      </View>
      
      {/* Helper text */}
      <Typography.Sm className="text-gray-500 text-center mt-2">
        Slide to complete your order
      </Typography.Sm>
    </View>
  );
}