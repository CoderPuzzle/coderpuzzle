# Solutions — Array Prototype Last

## Length-Arithmetic Prototype Extension

`Array.prototype` is shared by every array, so one assignment on it
enhances them all at once — including arrays created before the line runs,
because property lookup consults the prototype chain at call time. The
method body never needs to know which array it serves: inside a normal
function assignment the `this` keyword is the receiver of the call, so
plain length arithmetic does the whole job — read `this.length`, hand back
element `this.length - 1`, and return the statement's `-1` sentinel when
the length is zero.

The empty check has to come first: `this[this.length - 1]` on an empty
array would evaluate `this[-1]`, which is not an error but a quiet
`undefined`, silently wrong instead of the required `-1`. Arrays are
exactly the output of `JSON.parse`, so elements are plain JSON values —
numbers, strings, booleans, nulls, and nested containers — and indexing
returns whatever sits at the tail unchanged. An arrow function would be
wrong here in two ways: arrows have no `prototype` they need to advertise
for this problem but, more importantly, an arrow binds `this` lexically to
the surrounding scope rather than to the receiving array.

**Complexity:** `O(1)` time, `O(1)` space.
