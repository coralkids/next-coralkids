import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useClerk } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function SingInFeature() {
  const clerk = useClerk();

  const uri = AuthSession.makeRedirectUri();
  window.location.href = clerk.buildSignInUrl({
    signInForceRedirectUrl: uri,
  });
}
