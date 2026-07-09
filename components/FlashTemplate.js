import React from "react";
import {
// SafeAreaView, its deprecated in react native
View,
Text,
Image,
TouchableOpacity,
StyleSheet,
Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "../constants/Colors";
import ProgressDots from "./ProgressDots";
import PrimaryButton from "./PrimaryButton";

const {width,height}=Dimensions.get("window");

const FlashTemplate=({

image,
title,
subtitle,
active,
buttonText,
onNext,
onSkip

})=>{

return(

<SafeAreaView style={styles.container}>

<View style={styles.topBar}>

<ProgressDots active={active}/>

<TouchableOpacity onPress={onSkip}>
<Text style={styles.skip}>Skip</Text>
</TouchableOpacity>

</View>

<Image
source={image}
resizeMode="contain"
style={styles.image}
/>

<Text style={styles.title}>
{title}
</Text>

<Text style={styles.subtitle}>
{subtitle}
</Text>

<View style={{flex:1}}/>

<PrimaryButton
title={buttonText}
onPress={onNext}
/>

</SafeAreaView>

)

}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:"#fff",
paddingHorizontal:25
},

topBar:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginTop:15
},

skip:{
fontSize:16,
color:"#777"
},

image:{
width:width*0.85,
height:height*0.42,
alignSelf:"center",
marginTop:15,
borderRadius:10,


},

title:{
fontSize:38,
fontWeight:"700",
textAlign:"center",
marginTop:15,
color:"#111"
},

subtitle:{
fontSize:18,
textAlign:"center",
lineHeight:28,
marginTop:15,
color:"#666",
paddingHorizontal:12
}

})

export default FlashTemplate