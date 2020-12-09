import React from 'react' 
import { View, Text, StyleSheet, FlatList } from 'react-native'

import ListItem from "../components/ListItem"
import useFetch from "../hooks/useFetch"

export default ({ navigation }) => {
    
    const { loading, data: parks} = useFetch('http://smartcityhyo.tk/api/Parque/List_parque.php')
    
    return (
        <View style={ styles.container }>
            
            { loading ? 
            <View style={styles.loading}>
               <Text>Cargando...</Text>  
            </View>
            :
            <>
                <View style={styles.listContainer}>
                    <FlatList
                        style={styles.list}
                        data={parks}
                        keyExtractor={x => x.ID_Parque}
                        renderItem={({ item }) => 
                            <ListItem
                                onPress={() => navigation.navigate('Detalle', {
                                    ID_Parque: item.ID_Parque,
                                    PQ_Nombre: item.PQ_Nombre,
                                    PQ_Descripcion: item.PQ_Descripcion,
                                    ID_Distrito: item.ID_Distrito, 
                                    Distrito: item.Distrito,
                                    PQ_Direccion: item.PQ_Direccion,
                                    PQ_Latitud: item.PQ_Latitud,
                                    PQ_Longitud: item.PQ_Longitud,
                                    PQ_Imagen: item.PQ_Imagen,     
                                })}
                                name={item.PQ_Nombre}
                                url={item.PQ_Imagen}
                            />}
                    />
                </View>       
            </>          
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },

    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },

    list:{
        paddingTop: 15,
        paddingBottom: 15,
    },
})