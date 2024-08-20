import { useState } from "react";
import { Link } from "expo-router";
import { Text, View, ScrollView, Image } from "react-native";

import CustomBotton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {
    console.log(form);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-fill h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-Jakarta-SemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
          <View className="p-5">
            <InputField
              label="Name"
              placeholder="Enter your name"
              icon={icons.person}
              value={form.name}
              onChangeText={(value) => setForm({ ...form, name: value })}
            />
            <InputField
              label="Email"
              placeholder="Enter your email"
              icon={icons.email}
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              icon={icons.lock}
              secureTextEntry={true}
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />

            <CustomBotton
              title="Sing Up"
              onPress={onSignUpPress}
              className="mt-6"
            />

            {/* OAuth */}

            <Link
              href="/signin"
              className="text-lg text-center text-general-200 mt-10"
            >
              Already have an account?{" "}
              <Text className="text-primary-500">Log In</Text>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
