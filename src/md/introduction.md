# Veridex

Veridex backend api. It complies with the [Standard Relayer API](https://github.com/0xProject/standard-relayer-api) with additional endpoints to display markets stats and a api compatible with Radar/Bamboo relays for trading. It powers the [Verisafe Dex](https://dex.verisafe.io/#/erc20) and its [Dex as a Service](https://medium.com/@VeriSafe/veridex-network-dex-as-a-service-c5892e0b67b) 


# Rate Limits

Rate limit guidance for clients can be optionally returned in the response headers:

| Header Name           | Description                                                                  |
| --------------------- | ---------------------------------------------------------------------------- |
| X-RateLimit-Limit     | The maximum number of requests you're permitted to make per hour.            |
| X-RateLimit-Remaining | The number of requests remaining in the current rate limit window.           |
| X-RateLimit-Reset     | The time at which the current rate limit window resets in UTC epoch seconds. |

For example:

```bash
$ curl -i https://veridex.herokuapp.com/v2/asset_pairs
HTTP/1.1 200 OK
Date: Mon, 20 Oct 2017 12:30:06 GMT
Status: 200 OK
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 56
X-RateLimit-Reset: 1372700873
```

When a rate limit is exceeded, a status of **429 Too Many Requests** should be returned.

# Errors

Unless the spec defines otherwise, errors to bad requests should respond with HTTP 4xx or status codes.

## Common error codes

| Code | Reason                                  |
| ---- | --------------------------------------- |
| 400  | Bad Request – Invalid request format    |
| 404  | Not found                               |
| 429  | Too many requests - Rate limit exceeded |
| 500  | Internal Server Error                   |
| 501  | Not Implemented                         |

## Error reporting format

For all **400** responses, see the [error response schema](https://github.com/0xProject/0x-monorepo/blob/development/packages/json-schemas/schemas/relayer_api_error_response_schema.ts#L1).

```json
{
    "code": 101,
    "reason": "Validation failed",
    "validationErrors": [
        {
            "field": "maker",
            "code": 1002,
            "reason": "Invalid address"
        }
    ]
}
```

General error codes:

```bash
100 - Validation Failed
101 - Malformed JSON
102 - Order submission disabled
103 - Throttled
```

Validation error codes:

```bash
1000 - Required field
1001 - Incorrect format
1002 - Invalid address
1003 - Address not supported
1004 - Value out of range
1005 - Invalid signature or hash
1006 - Unsupported option
```

# API

Veridex API implements the Standard Relayer API and also a Radar/Bamboo relays compatible api for trading.