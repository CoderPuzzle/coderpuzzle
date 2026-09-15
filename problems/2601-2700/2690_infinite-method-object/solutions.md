# Solutions — Infinite Method Object

## Proxy Whose Get Trap Returns a Naming Function

The object must answer a method call with that method's own name, and the
names arrive only at call time — any string up to 1000 characters,
including ones no object could pre-declare. No fixed shape can promise
that, so the object has to synthesize each method at the moment its name
is looked up. JavaScript's `Proxy` offers exactly that synthesis point:
hand it any target plus a handler whose `get` trap ignores the target and
returns `() => prop`, and every property access on the proxy produces a
fresh function closing over the accessed name.

The trap intercepts every `[[Get]]` before any prototype walk, which is
what makes the promise total. Names that a plain object would resolve to
inherited or intrinsic values — `constructor`, `toString`, even
`__proto__` — never reach the prototype chain, so they answer through the
trap exactly like any other string and collide with nothing. There is no
state to exhaust: repeated lookups on one object, and lookups on
independent objects, all take the same one-line path. The judged driver
builds the object, calls `obj[method]()`, and returns what it yields.

**Complexity:** `O(1)` time, `O(1)` space.
