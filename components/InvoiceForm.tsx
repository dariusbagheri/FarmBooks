import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { realm } from "@/models/invoice"; // Adjust this import path as needed

export default function InvoiceForm() {
  const [vendor, setVendor] = useState("");
  const [lineItems, setLineItems] = useState([
    { description: "", quantity: "", unitPrice: "" },
  ]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { description: "", quantity: "", unitPrice: "" },
    ]);
  };

  const updateLineItem = (index, field, value) => {
    const updatedLineItems = [...lineItems];
    updatedLineItems[index][field] = value;
    setLineItems(updatedLineItems);

    // Recalculate total amount
    const newTotalAmount = updatedLineItems.reduce((sum, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const unitPrice = parseFloat(item.unitPrice) || 0;
      return sum + quantity * unitPrice;
    }, 0);
    setTotalAmount(newTotalAmount);
  };

  const saveInvoice = () => {
    realm.write(() => {
      const newInvoice = realm.create("Invoice", {
        vendor,
        dateIssued: new Date(),
        totalAmount,
      });

      lineItems.forEach((item) => {
        const lineItem = realm.create("LineItem", {
          description: item.description,
          quantity: parseInt(item.quantity, 10),
          unitPrice: parseFloat(item.unitPrice),
          totalPrice: parseInt(item.quantity, 10) * parseFloat(item.unitPrice),
        });
        newInvoice.lineItems.push(lineItem);
      });
    });

    // Reset form
    setVendor("");
    setLineItems([{ description: "", quantity: "", unitPrice: "" }]);
    setTotalAmount(0);
  };

  return (
    <ScrollView className="p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Create Invoice</Text>

      <View className="mb-4">
        <Text className="text-lg font-semibold mb-2">Vendor</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-2 bg-white"
          value={vendor}
          onChangeText={setVendor}
          placeholder="Enter vendor name"
        />
      </View>

      <Text className="text-lg font-semibold mb-2">Line Items</Text>
      {lineItems.map((item, index) => (
        <View key={index} className="mb-4 p-2 bg-white rounded-md shadow">
          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-2"
            value={item.description}
            onChangeText={(value) =>
              updateLineItem(index, "description", value)
            }
            placeholder="Item description"
          />
          <View className="flex-row justify-between">
            <TextInput
              className="border border-gray-300 rounded-md p-2 w-1/3"
              value={item.quantity}
              onChangeText={(value) => updateLineItem(index, "quantity", value)}
              placeholder="Quantity"
              keyboardType="numeric"
            />
            <TextInput
              className="border border-gray-300 rounded-md p-2 w-1/3"
              value={item.unitPrice}
              onChangeText={(value) =>
                updateLineItem(index, "unitPrice", value)
              }
              placeholder="Unit Price"
              keyboardType="numeric"
            />
          </View>
        </View>
      ))}

      <TouchableOpacity
        className="bg-blue-500 p-2 rounded-md mb-4"
        onPress={addLineItem}
      >
        <Text className="text-white text-center">Add Line Item</Text>
      </TouchableOpacity>

      <View className="mb-4">
        <Text className="text-lg font-semibold">
          Total Amount: ${totalAmount.toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity
        className="bg-green-500 p-3 rounded-md"
        onPress={saveInvoice}
      >
        <Text className="text-white text-center text-lg">Save Invoice</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
