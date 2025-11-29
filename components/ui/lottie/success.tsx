import LottieView, { LottieViewProps } from "lottie-react-native";

interface Props extends Omit<LottieViewProps, 'source'> {
  width?: number;
  height?: number;
}

export default function Success({  width = 200, height = 200, ...rest }: Props) {
  return (
    <LottieView
      autoPlay
      source={require('@/assets/lottie/success.json')}
      loop={false}
      style={{
        width,
        height,
      }}
      {...rest}
    />
  );
}