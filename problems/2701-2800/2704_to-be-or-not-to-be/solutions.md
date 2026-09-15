# Solutions — To Be Or Not To Be

The task is to build the two assertion matchers a test framework needs on
top of JavaScript's strict equality. A single captured value and the `===`
operator carry the entire comparison.

## Closure Over the Captured Value

`expect(val)` returns an object literal whose two methods close over the
one `val` the call captured. `toBe(other)` checks `val === other` and
returns `true` on a match; otherwise it throws `new Error("Not Equal")`.
`notToBe(other)` is the exact complement: `val !== other` returns `true`,
a match throws `new Error("Equal")`. Delegating to the native operator is
what makes every facet the cases probe fall out for free — strict equality
never coerces, so `"5"`, `5`, `true`, and `1` are all pairwise distinct;
`NaN` is not equal to itself; `0 === -0` holds even though the two differ
in sign bit; and objects and arrays compare by reference, so two freshly built
`{}` values never match while the same object passed twice always does.

The error half of the contract is as observable as the return half. The
driver records `{"value": true}` for a normal return and
`{"error": "<message>"}` for a throw, so the thrown message must be
byte-exact — `Not Equal` from `toBe`, `Equal` from `notToBe` — and the
success path must return the boolean `true` itself, not a truthy stand-in.
Each call to `expect` builds a fresh pair of matchers over its own
captured value, so assertions never share state.

**Complexity:** `O(1)` time, `O(1)` space.
