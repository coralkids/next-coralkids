import { spacing } from "@/theme/spacing";
import React from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import styled from "styled-components/native";

export default function OrganizationNameStep() {
  const [name, setName] = React.useState("");

  return (
    <OrganizationNameStepWrapper>
      <Text style={{ textAlign: "center" }} variant="titleLarge">
        Introduce el nombre de tu escuela
      </Text>
      <OrganizationNameStepTextInput
        style={{ width: "100%" }}
        label="Nombre de escuela"
        value={name}
        onChangeText={(text: string) => setName(text)}
      />
    </OrganizationNameStepWrapper>
  );
}

const OrganizationNameStepWrapper = styled(View)`
  justify-content: center;
  flex: 1;
  align-items: center;
`;

const OrganizationNameStepTextInput = styled(TextInput)`
  width: 100%;
  margin-top: ${spacing * 2}px;
`;
