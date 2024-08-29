import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { Realm, RealmProvider, useRealm, useQuery } from "@realm/react";
import { InvoiceSchema, LineItemSchema } from "@/models/invoice";

const CreateInvoice = () => {};
