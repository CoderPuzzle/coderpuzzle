# Solutions — Check if Object Instance of Class

## Prototype-Chain Walk

Instance checks in JavaScript are the prototype chain: an object "has
access to" a class's methods precisely when some link of its `[[Prototype]]`
chain is that class's `prototype` object. The answer therefore rejects the
degenerate inputs first — `null`/`undefined` values have no chain to walk,
and a second argument that is not a function, or is a function without a
usable `.prototype` such as an arrow function, has nothing to match
against — then repeatedly asks `Object.getPrototypeOf` for the next link,
returning true on the first match and false when the chain bottoms out at
`null`.

The walk works unchanged for primitives because `Object.getPrototypeOf(5)`
auto-boxes the value first, so the chain it starts from is
`Number.prototype`, exactly matching Example 4's "it accesses the Number
methods" framing — which the `instanceof` operator would have answered
false. Built-in constructors behave like any user class here: a constructor
itself is a plain function object whose chain runs through
`Function.prototype` toward `Object.prototype`, never through its own
`.prototype`, which is why `Date` is not an instance of itself even though
every date instance is. The loop inspects each link once, and the number of
links is bounded by the inheritance depth of the value.

**Complexity:** `O(depth)` time, `O(1)` space.
