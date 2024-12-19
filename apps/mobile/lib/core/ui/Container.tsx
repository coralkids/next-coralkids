import { spacing } from "@/theme/spacing";
import { View } from "react-native";
import styled from "styled-components/native";

const Container = styled(View)`
  max-width: 800px;
  width: 100%;
  padding: ${spacing}px;
  align-items: start;
  margin: 0 auto;
`;

export default Container;
