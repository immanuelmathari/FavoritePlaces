import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

function PlaceItem({ place, onSelect }) {
    return (
        <Pressable onPress={onSelect.bind(this, place.id)} style={ ({pressed}) => [styles.item, pressed && styles.pressed]} >
            <Image source={{uri: place.imageUri}} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.address}>{place.address}</Text>
            </View>
        </Pressable>
    )
}
export default PlaceItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
        marginVertical: 12, 
        backgroundColor: Colors.primary500,
        elevation: 2,
        // for ios
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 2,
    },
    pressed: {
        opacity: 0.7,
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100
    },
    info: {
        flex: 2,
        padding: 12,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.gray700,
    },
    address: {
        fontSize: 18,
        color: Colors.gray700
    },
});