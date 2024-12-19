import { Button, Text } from "react-native-paper";
import styled from "styled-components/native";
import { Image } from "expo-image";

export const SocialLoginButtonContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 20px;
  width: 100%;
  min-height: 25px;
  align-items: center;
  height: fit-content;
`;

export const SocialLoginButton = styled(Button)`
  width: 300px;
  margin-top: 20px;
  padding: 0px;
`;

export const SocialLoginButtonText = styled(Text)`
  text-align: center;
  width: 200px;
`;

export const SocialLoginImageIcon = styled(Image)`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;
