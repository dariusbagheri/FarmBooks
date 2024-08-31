import Realm, { BSON, ObjectSchema } from "realm";

Realm.setLogLevel("info");

// Define the LineItem schema
export class LineItem extends Realm.Object<LineItem> {
  static schema: ObjectSchema = {
    name: "LineItem",
    properties: {
      description: "string",
      quantity: "int",
      unitPrice: "double",
      totalPrice: "double",
    },
  };
}

// Define the Invoice schema
export class Invoice extends Realm.Object<Invoice> {
  static schema: ObjectSchema = {
    name: "Invoice",
    properties: {
      vendor: "string",
      dateIssued: "date",
      // lineItems: "LineItem[]", // This creates the one-to-many relationship
      lineItems: {
        type: "list",
        objectType: "LineItem",
        optional: false,
      },
      totalAmount: "double",
    },
  };
}

export class Item extends Realm.Object<Item> {
  static schema: Realm.ObjectSchema = {
    name: "Item",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new BSON.ObjectId() },
      text: "string",
      timestamp: "date",
      synced: "bool",
    },
  };
}

// Create and export a Realm instance with these schemas
// export const realm = new Realm({
//   schema: [InvoiceSchema, LineItemSchema, InputSchema],
// });
