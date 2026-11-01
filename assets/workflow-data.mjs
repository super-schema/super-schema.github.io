export const FIELD_INTENT = Object.freeze({
  id: Object.freeze({ description: "Stable customer identifier.", optional: false, classification: "INTERNAL" }),
  name: Object.freeze({ description: "Customer display name.", optional: false, classification: "PII" }),
  email: Object.freeze({ description: "Email address used for customer communications.", optional: true, classification: "PII" })
});

export const REFERENCES = Object.freeze({
  order: Object.freeze({
    title: "An Order references the Customer entity.",
    description: "The customer field names the shared Customer type. The relationship stays explicit in the model, with the related customer's fields defined in their own entity.",
    language: "TypeSpec excerpt · illustrative",
    code: "model Order {\n  id: string;\n  customer: Customer;\n}"
  }),
  api: Object.freeze({
    title: "An API response uses the Customer definition.",
    description: "The response points to a Customer schema component. Its fields describe the same logical customer, rather than an independently defined shape.",
    language: "OpenAPI excerpt · illustrative",
    code: 'responses:\n  "200":\n    description: Customer found\n    content:\n      application/json:\n        schema:\n          $ref: "#/components/schemas/Customer"'
  }),
  event: Object.freeze({
    title: "An event uses Customer as a message payload.",
    description: "The message refers to a Customer schema component. A real event contract also describes its channels, operations, servers, and other message context.",
    language: "AsyncAPI 3.0 excerpt · illustrative",
    code: 'components:\n  messages:\n    CustomerUpdated:\n      payload:\n        $ref: "#/components/schemas/Customer"'
  })
});

export const TARGET_REVIEW = Object.freeze({
  json: Object.freeze({
    mapped: Object.freeze({ id: "string · required", name: "string · required", email: "string · may be omitted" }),
    note: "JSON Schema properties are optional unless named in required. Here, id and name are required; email may be omitted."
  }),
  avro: Object.freeze({
    mapped: Object.freeze({ id: "string", name: "string", email: "null | string" }),
    note: "Email uses a union with null and a default of null in this example. Review compatibility with the schemas used by your producers and readers."
  }),
  sql: Object.freeze({
    mapped: Object.freeze({ id: "TEXT NOT NULL", name: "TEXT NOT NULL", email: "TEXT · nullable" }),
    note: "Id and name use NOT NULL; email allows NULL. String limits, keys, indexes, and other storage rules are additional physical decisions."
  })
});

const V1_FIELDS = Object.freeze(["id: string", "name: string", "email?: string"]);
const V1_1_FIELDS = Object.freeze([...V1_FIELDS, "phone?: string"]);

export function pinnedFields(version, examplePublished) {
  if (version === "1.0") return V1_FIELDS;
  if (version === "1.1" && examplePublished === true) return V1_1_FIELDS;
  return null;
}
