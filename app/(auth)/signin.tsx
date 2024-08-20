import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomBotton from "@/components/CustomButton";

const SignIn = () => {
  return (
    <SafeAreaView>
      <Link
        href="/(auth)/welcome"
        className="text-lg text-center text-general-200 mt-10"
      >
        <Text>Want to go back?</Text>
      </Link>
      <Text>SignIn!</Text>
    </SafeAreaView>
  );
};

export default SignIn;
