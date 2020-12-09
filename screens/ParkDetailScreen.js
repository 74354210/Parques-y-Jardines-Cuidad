import React from "react"

import { Text, View, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Foundation } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"

import useFetch from "../hooks/useFetch"

const { height, width } = Dimensions.get('screen')

export default ({ navigation }) => {
    const id = navigation.getParam('ID_Parque')
    const name = navigation.getParam('PQ_Nombre')
    const url = navigation.getParam('PQ_Imagen')
    const description = navigation.getParam('PQ_Descripcion')
    const distrito = navigation.getParam('Distrito')
    const direction = navigation.getParam('PQ_Direccion')
    const latitud = navigation.getParam('PQ_Latitud')
    const longitud = navigation.getParam('PQ_Longitud')
    
    const date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`;
    
    const { loading, data: sensorHumedad} = useFetch('http://smartcityhyo.tk/api/Sensores/list_sensores_tipo_humedad.php')
    const { loading2, data: sensorRadiacion} = useFetch('http://smartcityhyo.tk/api/Sensores/list_sensores_tipo_radiacio.php')
    const { loading3, data: sensorRuido} = useFetch('http://smartcityhyo.tk/api/Sensores/list_sensores_tipo_ruido.php')
    const { loading4, data: sensorTemperatura} = useFetch('http://smartcityhyo.tk/api/Sensores/list_sensores_tipo_temperatura.php')
    const { loading5, data: riego} = useFetch('http://smartcityhyo.tk/api/Mantenimiento/ListarMantenimiento.php')

    return(
        <View style={styles.container}>
            
            <Image
                style={styles.image}
                source={{ uri: `${url}` }}
            />
                <View style={styles.containerName}>
                    <Text style={styles.name}>{name}</Text>
                </View>
                <View style={styles.containerDirection}>
                    
                    <Text style={styles.direction}>
                        Dirección: {direction} 
                    
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Mapa', {
                            ID_Parque: id,
                            PQ_Nombre: name,
                            PQ_Direccion: direction,
                            PQ_Latitud: latitud,
                            PQ_Longitud: longitud,   
                        })}
                    >
                        <Text style={styles.vermapa}>Ver en el Mapa</Text>  
                    </TouchableOpacity>
                    </Text>
                    
                </View>

                <View style={styles.containerDescription}>

                        <Text 
                            style={styles.description}
                        > {description}
                        </Text>
                    
                        
                </View>
                <Text 
                    style={{fontSize: 16, fontWeight: 'bold', marginLeft: 20}}
                >
                    Sensores
                </Text>
                <View style={styles.containerSensorColumn}>
                    <View style={styles.containerSensor}>
                        <View style={styles.containerList}>
                            <AntDesign
                                name='cloud' size={30} color='#95E4FA'
                            />
                            <Text>Humedad: </Text>
                            {loading ? 
                                <View>
                                    <Text> Cargando ..</Text>
                                </View> 
                                :
                                <FlatList
                                    style={styles.list}
                                    data={sensorHumedad.filter(x=> x.ID_Parque === id)}
                                    keyExtractor={x => x.ID_Sensor}
                                    renderItem={({ item }) => 
                                        <Text
                                            style= {{ color:'black', fontSize: 15}}
                                        >{item.SE_Nivel}</Text>
                                        
                                    }
                                />
                                
                                }
                        </View>

                        <View style={styles.containerList}>
                            <FontAwesome5
                                name='temperature-high' size={30} color='red'
                            />
                            <Text>Temperatura: </Text>
                            {loading4 ? 
                                <View>
                                    <Text> Cargando ..</Text>
                                </View> 
                                :
                                <FlatList
                                    style={styles.list}
                                    data={sensorTemperatura.filter(x=> x.ID_Parque === id)}
                                    keyExtractor={x => x.ID_Sensor}
                                    renderItem={({ item }) => 
                                        <Text
                                            style= {{ color:'black', fontSize: 15}}
                                        >{item.SE_Nivel}</Text>
                                        
                                    }
                                />
                                
                                }
                        </View>                 
                    </View>             
                    
                    <View style={styles.containerSensor}>
                        <View style={styles.containerList}>
                            <Foundation
                                style={{margin:5}}
                                name='sound' size={30} color='black'
                            />
                            <Text>Ruido: </Text>
                            {loading3 ? 
                                <View>
                                    <Text> Cargando ..</Text>
                                </View> 
                                :
                                <FlatList
                                    style={styles.list}
                                    data={sensorRuido.filter(x=> x.ID_Parque === id)}
                                    keyExtractor={x => x.ID_Sensor}
                                    renderItem={({ item }) => 
                                        <Text
                                            style= {{ color:'black', fontSize: 15}}
                                        >{item.SE_Nivel}</Text>
                                        
                                    }
                                />
                                
                                }
                        </View>

                        <View style={styles.containerList}>
                            <MaterialCommunityIcons
                                name='white-balance-sunny' size={30} color='#F0DE02'
                            />
                            <Text>Radiacion: </Text>
                            {loading2 ? 
                                <View>
                                    <Text> Cargando ..</Text>
                                </View> 
                                :
                                <FlatList
                                    style={styles.list}
                                    data={sensorRadiacion.filter(x=> x.ID_Parque === id)}
                                    keyExtractor={x => x.ID_Sensor}
                                    renderItem={({ item }) =>
                                        
                                        <Text
                                            style= {{ color:'black', fontSize: 15}}
                                        >{item.SE_Nivel}</Text>
                                    }
                                />
                                
                                }
                        </View>
                    </View>
                </View>
                <View style={{margin:20}}>
                    <Text 
                        style={{fontSize: 16, fontWeight: 'bold', }}
                    >
                        Ultimo dia de Riego:
                    </Text>
                        {loading5 ? 
                            <View>
                                <Text> Cargando ..</Text>
                            </View> 
                            :
                            <FlatList
                                style={styles.list}
                                data={riego.filter(x=> x.ID_Parque === id)}
                                keyExtractor={x => x.ID_Mantenimiento}
                                renderItem={({ item }) =>
                                            
                                <Text
                                    style= {{ color:'black', fontSize: 15}}
                                >{item.MAN_Fecha_Mant}</Text>
                                }
                            />
                                    
                        }
                </View>         
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff'
    },

    image: {
        height: height/3,
        width: width,
    },

    containerName:{
        alignItems: 'flex-start',
    },

    name:{
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },

    containerDescription:{
        alignItems: 'center',
    },

    description:{
        padding: 20,
        fontSize: 16,
    },
    containerSensorColumn:{
        marginLeft:20,
        marginRight: 20,
        flexDirection: 'row'
    },

    containerSensor:{
        //marginLeft: 20,
        //marginRight: 20,
    },

    containerList:{
        alignItems: 'center',
        flexDirection: 'row'
    },

    list:{
        height: height/45, 
        //backgroundColor: '#eee'
    },

    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerDirection:{
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    direction:{
        marginLeft: 20,
        fontSize: 14,
        color: '#888'
    },

    vermapa:{
        color: '#26C4F0',
        textDecorationLine: 'underline' 
    },

    containerButton:{
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 20,
    },

    button:{
        justifyContent: 'center',
        alignItems: 'center',
        width: width/2.3,
        height:  height/19.5,
        borderRadius: 30,
        backgroundColor: "#F54021",
    },

    btnText:{
        fontSize: 17,
        color: 'white',
    }
})