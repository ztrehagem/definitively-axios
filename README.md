# @ztrehagem/definitively-axios
HTTP client with type-safe response through axios.

## Usage
Import.
```ts
import definitively, { DefinitivelyResponse } from '@ztrehagem/definitively-axios'
```

You can create some instances like axios.
```ts
const instance = definitively.create({
  validateStatus: (status) => status < 500,
})
```

Declare probable schemas in the data of HTTP response.

```ts
interface SchemaA { hoge: string }
interface SchemaB { fuga: number }
```

Declare probable patterns of the HTTP response as a pair of status code and schema.
Note that the available status code is able to be changed by `validateStatus`.
```ts
type DefinitivelyA = DefinitivelyResponse<200 | 201, SchemaA>
type DefinitivelyB = DefinitivelyResponse<400, SchemaB>
```

Execute HTTP request with the patterns.
```ts
const response = await instance.get<DefinitivelyA | DefinitivelyB>('/mock')
```

If you use switch or if statement with each the status codes, **the schema of response is inferred!**
Note that `response.status` is also inferred to `<200 | 201 | 400>` in this case.
```ts
switch (response.status) {
  case 200:
  case 201:
    response.data //=> <SchemaA>
    break
  case 400:
    response.data //=> <SchemaB>
    break
}
```

See `example.ts` for entire of the sample code.
