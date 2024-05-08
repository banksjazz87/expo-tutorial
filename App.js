import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import ImageViewer from "./components/ImageViewer.js";
import Button from "./components/Button.js";
import * as ImagePicker from "expo-image-picker";

const PlaceHolderImage = require("./assets/images/background-image.png");

export default function App() {
	const [selectedImage, setSelectedImage] = useState(null);

	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
		} else {
			alert("You did not select any image.");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<ImageViewer
					placeHolderImageSource={PlaceHolderImage}
					imageSource={selectedImage}
				/>
			</View>

			<View style={styles.footerContainer}>
				<Button
					theme="primary"
					label="Choose a photo"
					onPress={pickImageAsync}
				/>
				<Button
					theme=""
					label="Use this photo"
					onPress={pickImageAsync}
				/>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
		alignItems: "center",
	},
	imageContainer: {
		flex: 1,
		paddingTop: 58,
	},

	footerContainer: {
		flex: 1 / 3,
		alignItems: "center",
	},
});
