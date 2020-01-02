# File based cache for Node.js
This package provides a simple filesystem based caching layer for Node.js-applications.

## Usage

```js
import FileCache from '@krisell/file-cache'

const cache = new FileCache('/tmp')

cache.remember(key, ttl, () => {
  // Any statements you like.
  // The returned value is kept in cache and this callback will not be executed again until the cache has expired.

  // ttl is given in seconds
})

// Example
cache.remember('tts-token', 30, () => {
  return 'result-of-heavy-db-query-or-api-call'
}).then(data => console.log(data))
```

## Example use cases
API-calls that require a call to issue a token that is valid for 10 minutes. Use this cache to only perform this request at most every 9 minutes.
