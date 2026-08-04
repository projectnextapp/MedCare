import React from "react";
import FlashTemplate from "../../../../components/FlashTemplate";

export default function FlashScreen1({ navigation }) {
  return (
    <FlashTemplate
      image={require("../../../../assets/images/splash1.png")}
      title="We'll Help You Take Care Of Yourself"
      subtitle="Consult certified doctors, manage appointments and access medical records anytime."
      active={1}
      buttonText="Next"
      onNext={() => navigation.navigate("Flash2")}
      onSkip={() => navigation.replace("AuthStack")}
    />
  );
}
