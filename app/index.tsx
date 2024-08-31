import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import {
  Realm,
  AppProvider,
  UserProvider,
  RealmProvider,
  useAuth as realmUseAuth,
} from "@realm/react";
import { Item } from "@/models/invoice";
import { Text, View, ActivityIndicator } from "react-native";
import { useEffect } from "react";

const appId = process.env.EXPO_PUBLIC_ATLAS_APP_ID;

const LogIn = () => {
  const { logInWithAnonymous, result } = realmUseAuth();

  useEffect(() => {
    logInWithAnonymous();
  }, []);

  return (
    <View>
      {!result.error && <Text>Please log in</Text>}
      <View>
        {result.pending && <ActivityIndicator />}
        {result.error && <Text>error: {result.error}</Text>}
        {/* {result.error ? <Text>result.error</Text> : ""} */}
      </View>
    </View>
  );
};

const Home = () => {
  const { isSignedIn } = useAuth();

  const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
    type: Realm.OpenRealmBehaviorType.DownloadBeforeOpen,
    timeOutBehavior: Realm.OpenRealmTimeOutBehavior.OpenLocalRealm,
    timeOut: 1000,
  };

  return (
    <AppProvider id={appId} baseUrl="">
      <UserProvider fallback={LogIn}>
        <RealmProvider
          schema={[Item]}
          sync={{
            flexible: true,
            newRealmFileBehavior: realmAccessBehavior,
            existingRealmFileBehavior: realmAccessBehavior,
          }}
        >
          {isSignedIn ? (
            <Redirect href={"/(root)/(tabs)/rides"} />
          ) : (
            <Redirect href="/(auth)/welcome" />
          )}
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
};

export default Home;
