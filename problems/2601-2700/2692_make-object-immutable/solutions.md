# Solutions — Make Object Immutable

The task is to intercept every mutation path a JSON value exposes — key
writes, index writes, and the seven mutating array methods — and turn each
into the documented thrown string, without disturbing any read. One
language feature does all of it: the `Proxy`.

## Recursive Proxy

`makeImmutable(obj)` returns `new Proxy(obj, handlers)` and never copies
or freezes anything. The `set` trap does nothing but throw: the object
form raises `` `Error Modifying: ${property}` `` and the array form
`` `Error Modifying Index: ${property}` `` — a string literal, not an
`Error`, exactly as the statement demands — so a write is rejected before
the target is ever touched, even when the written value equals the current
one. For arrays, the `get` trap checks the property against
`pop`/`push`/`shift`/`unshift`/`splice`/`sort`/`reverse` and returns a
stub function that throws `` `Error Calling Method: ${property}` `` when
invoked; everything else falls through to `Reflect.get` on the real
target.

Reads stay live because only the mutating paths are intercepted. The
`get` trap passes each fetched value through `wrapReads`, which recursively
applies `makeImmutable` to any object or array it sees (the hint's
"recursively use proxy"): a nested structure is guarded the moment it is
reached, so `obj.arr.push(4)` throws even though `obj` itself was never
written. Primitives and `null` pass through untouched, `Object.keys` and
`JSON.stringify` read through the default traps in insertion order, and
iteration plus non-mutating methods (`slice`, `map`, `join`, …) operate on
the proxy exactly as on the raw value. Each trapped operation does
constant work, and wrapping is lazy — `makeImmutable` itself is a single
`Proxy` construction no matter how large `obj` is.

**Complexity:** `O(1)` time, `O(1)` space.
