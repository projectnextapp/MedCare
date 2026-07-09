import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const ProgressDots = ({ active }) => {

    return (

        <View style={styles.container}>

            {[1,2,3].map((item)=>(
                <View
                    key={item}
                    style={[
                        styles.dot,
                        active===item && styles.activeDot
                    ]}
                />
            ))}

        </View>

    );

};

const styles = StyleSheet.create({

    container:{
        flexDirection:"row",
        marginTop:20,
        marginBottom:20
    },

    dot:{
        width:10,
        height:10,
        borderRadius:5,
        backgroundColor:Colors.lightGray,
        marginHorizontal:5
    },

    activeDot:{
        width:28,
        backgroundColor:Colors.black
    }

});

export default ProgressDots;