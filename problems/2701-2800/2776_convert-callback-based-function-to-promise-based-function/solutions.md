# Solutions — Convert Callback Based Function to Promise Based Function

## Inject a deciding callback

The returned wrapper builds one promise per call and hands `fn` a
callback of its own ahead of the caller's plain arguments: `fn(callback,
...args)`. When `fn` later invokes that callback with no second
argument, its first parameter becomes the promise's resolved value; when
it passes an error as the second argument, the promise rejects with that
error verbatim — Example 2's `"Promise Rejected"` string, not a wrapper
around it.

Rest parameters keep the forwarding arity-free, so the same wrapper
serves one argument or a hundred without knowing which; the deciding
check is simply whether the error position was supplied, which is also
why a legitimately `undefined` result value resolves rather than
rejects.

**Complexity:** `O(1)` work per wrapped call beyond `fn`'s own, `O(1)`
space.
