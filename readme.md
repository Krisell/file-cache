# File based cache for Node.js
This package provides a simple filesystem based caching layer for Node.js-applications.

## Installation
`npm i @krisell/file-cache`

## Usage

```js
import FileCache from '@krisell/file-cache'

const cache = new FileCache('/tmp')

cache.remember(key, ttl, () => {
  // Do whatever you want, and return a promise which resolves to the data you like to cache.
  // The data is kept in cache and this callback will not be executed again until the cache has expired.

  // If your data can be retreived synchronously, you still need to return a promise and
  // can do this using return Promise.resolve(data)

  // ttl is given in seconds
})
```

## Example

```js
cache.remember('tts-token', 30, () => {
  return Promise.resolve('result-of-heavy-db-query-or-api-call')
}).then(data => console.log(data))
```

## Use cases
API-calls that require a call to issue a token that is valid for 10 minutes. Use this cache to only perform this request at most every 9 minutes.

## Firebase Functions
Even though Firebase Functions are stateless, you have access to a /tmp directory for temporary files, and these are usually persisted between requests assuming the same instance is used (not for parallell requests). I use this for storing API access keys which are never needed (they can be fetched) but improves performance if they happen to exists. For data requiring reliable persistance, use another solution.
