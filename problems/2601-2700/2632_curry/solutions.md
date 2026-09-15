# Solutions — Curry

## Stage Collector over Concatenated Batches

`curry` reads the target's explicit parameter count from `fn.length`, then
builds stage functions one level deep: each application concatenates its
batch onto the arguments collected so far and, once the running total reaches
the arity, applies `fn` to everything at once — otherwise it hands back
another stage seeded with the merged list. Zero-parameter targets resolve on
the first application (Example 4), empty batches concatenate nothing and
return an equivalent stage (Examples 2 and 3), and a single full batch goes
straight to `fn` (Example 1).

Concatenation instead of shared-buffer mutation is what keeps the shape
honest: every stage owns its own argument list, so an intermediate like
`csum(1)` can be reused freely or abandoned without leaking arguments into
unrelated chains. Stack depth stays constant during evaluation because a
chained expression such as `curried(1)(2)(3)` performs one application at a
time — each call returns before the next begins — so even a thousand-step
chain never nests more than a couple of frames. Each accepted batch costs one
list copy of the arguments seen so far.

**Complexity:** `O(A²)` worst-case argument copying for an arity-`A` chain
(one growing concat per batch; `A ≤ 1000` by the constraints), `O(A)` space.
