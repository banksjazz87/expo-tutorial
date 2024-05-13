import { View } from "react-native";
import Animated from "react-native-reanimated";

export default function EmojiSticker({ imageSize, stickerSource }) {
	return (
		<View>
			<Animated.Image
				source={stickerSource}
				resizeMode="contain"
				style={{ width: imageSize, height: imageSize }}
			/>
		</View>
	);
}
