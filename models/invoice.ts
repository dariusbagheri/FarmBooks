import Realm, { ObjectSchema } from "realm";

// Define the LineItem schema
class LineItem extends Realm.Object<LineItem> {
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
class Invoice extends Realm.Object<Invoice> {
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

// Export the schemas
export const InvoiceSchema = Invoice.schema;
export const LineItemSchema = LineItem.schema;

// Create and export a Realm instance with these schemas
export const realm = new Realm({
  schema: [InvoiceSchema, LineItemSchema],
  schemaVersion: 1,
});
