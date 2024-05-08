import { StyleSheet, View, Image } from "react-native";

export default function ImageViewer({ placeHolderImageSource, imageSource }) {
	const image = imageSource ? { uri: imageSource } : placeHolderImageSource;
	return (
		<Image
			source={image}
			style={styles.image}
		/>
	);
}

const styles = StyleSheet.create({
	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	},
});
