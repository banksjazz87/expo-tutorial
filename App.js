import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import ImageViewer from "./components/ImageViewer.js";
import Button from "./components/Button.js";
import * as ImagePicker from "expo-image-picker";
import CircleButton from "./components/CircleButton.js";
import IconButton from "./components/IconButton.js";
import EmojiPicker from "./components/EmojiPicker.js";
import EmojiList from "./components/EmojiList.js";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EmojiSticker from "./components/EmojiSticker.js";

const PlaceHolderImage = require("./assets/images/background-image.png");

export default function App() {
	const [selectedImage, setSelectedImage] = useState(null);
	const [showAppOptions, setShowAppOptions] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [pickedEmoji, setPickedEmoji] = useState(null);

	const onReset = () => {
		setShowAppOptions(false);
	};

	const onAddSticker = () => {
		setIsModalVisible(true);
	};

	const onModalClose = () => {
		setIsModalVisible(false);
	};

	const onSaveImageAsync = async () => {};

	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
			setShowAppOptions(true);
		} else {
			alert("You did not select any image.");
		}
	};

	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.imageContainer}>
				<ImageViewer
					placeHolderImageSource={PlaceHolderImage}
					imageSource={selectedImage}
				/>
				{pickedEmoji && (
					<EmojiSticker
						imageSize={40}
						stickerSource={pickedEmoji}
					/>
				)}
			</View>
			{showAppOptions ? (
				<View style={styles.optionsContainer}>
					<View style={styles.optionsRow}>
						<IconButton
							icon="refresh"
							label="Reset"
							onPress={onReset}
						/>
						<CircleButton onPress={onAddSticker} />
						<IconButton
							icon="save-alt"
							label="Save"
							onPress={onSaveImageAsync}
						/>
					</View>
				</View>
			) : (
				<View style={styles.footerContainer}>
					<Button
						theme="primary"
						label="Choose a photo"
						onPress={pickImageAsync}
					/>
					<Button
						theme=""
						label="Use this photo"
						onPress={() => setShowAppOptions(true)}
					/>
				</View>
			)}

			<EmojiPicker
				isVisible={isModalVisible}
				onClose={onModalClose}
			>
				<EmojiList
					onSelect={setPickedEmoji}
					onCloseModal={onModalClose}
				/>
			</EmojiPicker>

			<StatusBar style="auto" />
		</GestureHandlerRootView>
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

	optionsContainer: {
		position: "absolute",
		bottom: 80,
	},
	optionsRow: {
		alignItems: "center",
		flexDirection: "row",
	},
});
