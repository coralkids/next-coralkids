import { SignIn } from "@clerk/clerk-react";
import { View } from "react-native";
import styled from "styled-components/native";

export default function SingInFeature() {
  return (
    <WebSignInContainer>
      <SignIn />
    </WebSignInContainer>
  );
}

const WebSignInContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  font-family: "MRegular";
`;
