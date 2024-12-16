import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View>
      <SafeAreaView>
        <SignedIn>
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
          <TouchableOpacity onPress={() => signOut()}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </SignedIn>
        <SignedOut>
          <Redirect href="/(auth)/sign-in" />
        </SignedOut>
      </SafeAreaView>
    </View>
  );
}
