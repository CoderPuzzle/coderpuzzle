# Solutions — Event Emitter

## Listener map with self-removing handles

The whole design is one `Map` from event name to the array of callbacks
subscribed to that event, kept in subscribe order. Appending to that array is
what makes ordering fall out for free: `emit` walks the array front to back,
so callbacks fire in exactly the order they were subscribed, and the results
array it collects is the answer verbatim. `subscribe` hands back a handle
whose `unsubscribe` closure captures both the list and the exact callback
object that was pushed — so removal is by identity, and two subscriptions
built from identical source text are two distinct function objects that both
stay registered until each removes itself.

`emit` defaults its second parameter to an empty array and spreads it into
every callback, so a one-argument call and an explicit `[]` both mean "invoke
with zero arguments". An event nobody subscribed to simply has no entry in
the map, and reading a missing key yields `undefined`, whose fallback empty
array produces the required `[]` without a special case. The handle's
`unsubscribe` locates its own callback with `indexOf` and splices it out;
the `-1` guard makes a handle inert after a second click rather than
corrupting the list.

Every listener list is bounded by the script — the constraints cap a case at
ten actions, so at most nine callbacks can be live on any event — which
makes each method's work a constant in the input size: `subscribe` appends,
`emit` visits each live listener once, and `unsubscribe` scans a list that
cannot grow with the input.

**Complexity:** `O(1)` time, `O(1)` space.
