import useUser from "@/lib/user/hooks/useUser";
import { spacing } from "@/theme/spacing";
import { useAuth } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Button,
  Divider,
  Menu,
  Text,
  useTheme,
} from "react-native-paper";
import styled from "styled-components/native";

const ProfileTouchableWithMenu = () => {
  const user = useUser();
  const auth = useAuth();
  const theme = useTheme();

  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  return (
    <View>
      <ProfileMenu
        visible={isUserMenuVisible}
        onDismiss={() => setIsUserMenuVisible(false)}
        anchor={
          <ProfileMenuOpenIcon
            size={0}
            color={theme.colors.primary}
            onPress={() => setIsUserMenuVisible(true)}
            name={isUserMenuVisible ? "up" : "down"}
          ></ProfileMenuOpenIcon>
        }
      >
        <Menu.Item leadingIcon="account-edit" title="Mi perfil"></Menu.Item>
        <Menu.Item leadingIcon="account-cog" title="Configuracion"></Menu.Item>

        <Divider />
        <LogountButton
          onPress={() => auth.signOut()}
          icon="logout"
          mode="contained-tonal"
        >
          Salir
        </LogountButton>
      </ProfileMenu>
      <ProfileTouchableOpacity onPress={() => setIsUserMenuVisible(true)}>
        <React.Fragment>
          <ProfileAvatarImage size={40} source={{ uri: user?.imageUrl }} />
          <ProfileFullName variant="labelMedium">
            {user?.firstName} {user?.lastName}
          </ProfileFullName>
          <ProfileMenuOpenIcon
            size={15}
            color={theme.colors.inverseSurface}
            onPress={() => setIsUserMenuVisible(true)}
            name={isUserMenuVisible ? "up" : "down"}
          ></ProfileMenuOpenIcon>
        </React.Fragment>
      </ProfileTouchableOpacity>
    </View>
  );
};

const ProfileAvatarImage = styled(Avatar.Image)``;

const ProfileFullName = styled(Text)`
  margin-left: ${spacing}px;
`;

const ProfileTouchableOpacity = styled(TouchableOpacity)`
  flex-direction: row;
  width: 180px;
  justify-content: start;
  align-items: center;
  padding: 0px ${spacing}px;
`;

const ProfileMenuOpenIcon = styled(AntDesign)`
  margin-left: 5px;
  margin-top: 2px;
`;

const ProfileMenu = styled(Menu)`
  margin-top: 60px;
  margin-left: ${spacing / 2}px;
`;

const LogountButton = styled(Button)`
  margin: ${spacing}px;
  margin-bottom: 0;
`;

export default ProfileTouchableWithMenu;