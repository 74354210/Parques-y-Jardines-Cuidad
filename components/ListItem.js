import React from "react"
import { TouchableOpacity, Text, View, StyleSheet, Dimensions, ImageBackground } from "react-native"

const { height, width } = Dimensions.get('screen')

export default ({ name, url, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <ImageBackground
                style={ styles.imageBackground }
                source={{ uri: `${url}` }}
            >     
            </ImageBackground>
            <View style={styles.content}>
                <Text style={styles.name}>{name}</Text>   
            </View>     
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {       
        flex: 1,
        borderRadius: 15,
        margin: 6,
        height: height/7,
        width: width/1.1,
        marginBottom: 20,
        //justifyContent: 'center',
    },

    imageBackground: {    
        flex: 1,
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: "center",
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
    },

    name: {
        color: "#000000",
        fontSize: 23,
        fontWeight: "bold",
    },
})
