# API

## Responses

## Success

Success: HTTP 2xx 
On success API returns following structure:
```ts
{
  { /* response data */ }
}
```

## Pagination

By convention paginated endpoints return data in following format:
```ts
{
  Items: [/* array of items */],
  Count: number,
  Limit: number,
  Page: number,
  Pages: number,  
...anyAdditionalFieldsIfNeeded
}
```

## Error

Error: HTTP 4xx/5xx 
On error API returns following structure:
```ts
{
  error: {
    message: 'Error message',
    reasons: [
      { path: '<field_path>', message: 'Field error message', reason: '<reasonCode>' },
      ...
    ],
    severity: 'error' | 'warning',
    type: 'authentication' | 'validation' | 'internal',
  }
}
```

## Implementation of success responses (TBD)

Response formatting mainly takes place at Controller level:

```ts
```

## Implementation of error responses (TBD)

Error responses are formated automatically by middleware which catches them and sends formated response.