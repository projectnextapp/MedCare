import React from "react";
import {TouchableOpacity,Text,StyleSheet} from "react-native";
import Colors from "../constants/Colors";

const PrimaryButton = ({title,onPress})=>{

return(

<TouchableOpacity
style={styles.button}
onPress={onPress}
activeOpacity={0.8}
>

<Text style={styles.text}>
{title}
</Text>

</TouchableOpacity>

)

}

const styles=StyleSheet.create({

button:{
height:60,
backgroundColor:"#0066FF",
borderRadius:35,
justifyContent:"center",
alignItems:"center",
marginBottom:35
},

text:{
color:"#fff",
fontSize:18,
fontWeight:"700"
}

})

export default PrimaryButton