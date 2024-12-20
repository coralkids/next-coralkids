import { spacing } from "@/theme/spacing";
import { View } from "react-native";
import styled from "styled-components/native";

const Container = styled(View)`
  max-width: 1024px;
  width: 100%;
  height: 100%;
  flex: 1;
  padding: ${spacing}px;
  align-items: start;
  margin: 0 auto;
`;

export default Container;
