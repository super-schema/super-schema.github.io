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
  openapi: Object.freeze({
    label: "OpenAPI 3",
    filename: "customer.openapi.json",
    status: "Stable",
    code: JSON.stringify({
      openapi: "3.0.3",
      info: { title: "Customer API", version: "1.0.0" },
      paths: {},
      components: { schemas: { Customer: {
        type: "object",
        properties: { id: { type: "string" }, name: { type: "string" }, email: { type: "string" } },
        required: ["id", "name"]
      } } }
    }, null, 2),
    note: "A reusable Customer schema component. Add operations and responses when designing the complete API contract."
  }),
  bigquery: Object.freeze({
    label: "BigQuery",
    filename: "customer.bigquery.sql",
    status: "Stable",
    code: "CREATE TABLE customer (\n  id STRING NOT NULL,\n  name STRING NOT NULL,\n  email STRING\n);",
    note: "Required fields use NOT NULL; email is nullable. Dataset placement, partitioning, and clustering are separate storage decisions."
  }),
  spanner: Object.freeze({
    label: "Spanner",
    filename: "customer.spanner.sql",
    status: "Stable",
    code: "CREATE TABLE customer (\n  id STRING(MAX) NOT NULL,\n  name STRING(MAX) NOT NULL,\n  email STRING(MAX)\n) PRIMARY KEY (id);",
    note: "This GoogleSQL example chooses id as its primary key. Review key design, key-size limits, and string bounds for your application."
  }),
  java: Object.freeze({
    label: "Java POJO",
    filename: "Customer.java",
    status: "Preview",
    code: 'import com.fasterxml.jackson.annotation.JsonProperty;\n\npublic class Customer {\n  @JsonProperty(value = "id", required = true)\n  public String id;\n\n  @JsonProperty(value = "name", required = true)\n  public String name;\n\n  @JsonProperty("email")\n  public String email;\n}',
    note: "Preview: Jackson annotations record property intent. Public fields and required metadata do not enforce runtime validation; review your deserializer and validation rules."
  }),
  protobuf: Object.freeze({
    label: "Protobuf",
    filename: "customer.proto",
    status: "Preview",
    code: 'syntax = "proto3";\n\nmessage Customer {\n  string id = 1;\n  string name = 2;\n  optional string email = 3;\n}',
    note: "Preview: optional preserves email presence. Proto3 scalar fields do not enforce required id or name; validate those requirements in your application."
  }),
  sql: Object.freeze({
    label: "PostgreSQL",
    filename: "customer.sql",
    status: "Stable",
    code: "CREATE TABLE customer (\n  id TEXT NOT NULL,\n  name TEXT NOT NULL,\n  email TEXT\n);"
  })
});
