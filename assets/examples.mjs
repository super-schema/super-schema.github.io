export const EXAMPLES = Object.freeze({
  json: Object.freeze({
    label: "JSON Schema",
    filename: "customer.schema.json",
    status: "Stable",
    code: "{\n  \"$schema\": \"https://json-schema.org/draft/2020-12/schema\",\n  \"title\": \"Customer\",\n  \"type\": \"object\",\n  \"properties\": {\n    \"id\": {\n      \"type\": \"string\"\n    },\n    \"name\": {\n      \"type\": \"string\"\n    },\n    \"email\": {\n      \"type\": \"string\"\n    }\n  },\n  \"required\": [\n    \"id\",\n    \"name\"\n  ]\n}"
  }),
  avro: Object.freeze({
    label: "Avro",
    filename: "customer.avsc",
    status: "Stable",
    code: JSON.stringify({
      type: "record",
      name: "Customer",
      fields: [
        { name: "id", type: "string" },
        { name: "name", type: "string" },
        { name: "email", type: ["null", "string"], default: null }
      ]
    }, null, 2)
  }),
  protobuf: Object.freeze({
    label: "Protobuf",
    filename: "customer.proto",
    status: "Preview",
    code: 'syntax = "proto3";\n\nmessage Customer {\n  string id = 1;\n  string name = 2;\n  optional string email = 3;\n}'
  }),
  sql: Object.freeze({
    label: "PostgreSQL",
    filename: "customer.sql",
    status: "Stable",
    code: "CREATE TABLE customer (\n  id TEXT NOT NULL,\n  name TEXT NOT NULL,\n  email TEXT\n);"
  })
});
