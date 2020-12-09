import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'

import MapView, { Marker } from 'react-native-maps'

import useFetch from "../hooks/useFetch"

const { height, width } = Dimensions.get('screen')

export default ({ navigation }) => {
    const latitud = navigation.getParam('PQ_Latitud')
    const longitud = navigation.getParam('PQ_Longitud')
    const name = navigation.getParam('PQ_Nombre')
    const direction = navigation.getParam('PQ_Direccion')

    const latitude= parseFloat(latitud)
    const longitude= parseFloat(longitud)

    return(
    <View style={styles.container}>
        <MapView
        initialRegion={{
            latitude: latitude,
            longitude: longitude,
            longitudeDelta: 0.09,
            latitudeDelta: 0.05,
        }}
        style={styles.map}
        minZoomLevel={18}
        >
            <Marker
                coordinate={{
                    latitude: latitude,
                    longitude: longitude
                }}
                title={name}
            />
        </MapView>

        <View style={styles.containerDirection}>
            <Text style={styles.direction}>{direction}</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 2,
    },
    map:{
        flex: 1.80,
        height: height/1.35,
        width: width,
    },
    containerDirection:{
        flex: 0.20,
        backgroundColor: '#fff'
    },
    direction:{
        padding:20,
        fontSize: 20,
        fontWeight: 'bold'
    }
})