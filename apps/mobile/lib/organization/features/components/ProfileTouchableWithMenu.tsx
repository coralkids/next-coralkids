import useUser from "@/lib/user/hooks/useUser";
import { useAuth } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Avatar, Button, Menu, Text } from "react-native-paper";
import styled from "styled-components/native";

const ProfileTouchableWithMenu = () => {
  const user = useUser();
  const auth = useAuth();

  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  return (
    <React.Fragment>
      <ProfileTouchableOpacity onPress={() => setIsUserMenuVisible(true)}>
        <ProfileAvatarImage size={40} source={{ uri: user?.imageUrl }} />
        <ProfileFullName variant="labelMedium">
          {user?.firstName} {user?.lastName}
        </ProfileFullName>
      </ProfileTouchableOpacity>
      <ProfileMenu
        visible={isUserMenuVisible}
        onDismiss={() => setIsUserMenuVisible(false)}
        anchor={
          <ProfileMenuOpenIcon
            size={15}
            onPress={() => setIsUserMenuVisible(true)}
            name={isUserMenuVisible ? "up" : "down"}
          ></ProfileMenuOpenIcon>
        }
      >
        <LogountButton
          onPress={() => auth.signOut()}
          icon="logout"
          mode="contained-tonal"
        >
          Salir
        </LogountButton>
      </ProfileMenu>
    </React.Fragment>
  );
};

const ProfileAvatarImage = styled(Avatar.Image)`
  margin-left: 10px;
`;

const ProfileFullName = styled(Text)`
  margin-left: 10px;
`;

const ProfileTouchableOpacity = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProfileMenuOpenIcon = styled(AntDesign)`
  margin-left: 5px;
  margin-top: 2px;
`;

const ProfileMenu = styled(Menu)`
  margin-left: -100px;
  margin-top: 50px;
`;

const LogountButton = styled(Button)`
  margin: 10px;
`;

export default ProfileTouchableWithMenu;
