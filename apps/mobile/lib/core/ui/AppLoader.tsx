import { View } from "react-native";
import styled, { ThemeStyledProps } from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";

const AppLoader = () => {
  return (
    <Container>
      <ActivityIndicator animating={true} size="large" />
    </Container>
  );
};

export default AppLoader;

const Container = styled(View)`
  justify-content: center;
  justify-content: space-around;
  padding: 10px;
  background-color: ${({ theme }: ThemeStyledProps) =>
    theme.colors?.background};
  width: 100%;
  height: 100%;
`;
