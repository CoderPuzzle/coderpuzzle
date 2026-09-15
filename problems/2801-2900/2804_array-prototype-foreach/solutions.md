# Solutions — Array Prototype ForEach

## Prototype patch over a fixed-range index walk

The submission installs one function on `Array.prototype` and lets every
array inherit it: a single ascending `for` loop whose bound is read once
from `this.length` before the first call. Each visit passes exactly
`(this[index], index, this)` positionally into the callback and invokes it
through `callback.call(context, ...)`, so whatever object arrived as
`context` is present as `this` inside every call — which is what makes the
`arr[i] = this` shape of Example 2 stamp the context itself into each slot.
Assignments go straight through the receiver, so a write made at index j is
what later visits of a shifted or mirrored callback observe; nothing is
pushed, returned, or collected anywhere, because forEach's entire contract
is the state it leaves the array in, never a value.

The judged path keeps that claim honest rather than trusting it. Inside
`solve(forEachCase)`, `collect()` first exercises the installed method on
fresh probe arrays — checking the argument triple, ascending order,
receiver identity, write visibility, empty-array silence, context landing
on `this`, and that the call yields `undefined` — and throws on any miss.
`run()` then rejects the native `Array.prototype.forEach`, captured by the
carrier before submission code ran, so a submission cannot ride the built-in
implementation; only after that guard does it drive this case's own array
through the submitted method and snapshot its final contents as the
transcript. Arrow sources from the Input are rewritten once to ordinary
function declarations by the carrier before evaluation, since an arrow's
lexical `this` could otherwise never receive the context the statement
promises; ordinary function sources pass through untouched.

Every case does constant work per element — one property lookup per slot
plus one call — over a range fixed at entry, so the cost tracks the input
length alone. No result buffer is ever built: all mutation happens in place
inside the case array.

**Complexity:** `O(n)` time, `O(1)` auxiliary space.
