# Solutions — Allow One Function Call

The entire problem is one bit of state captured around the returned
wrapper: whether the single permitted call has already happened.

## A done flag inside the closure

`once` initializes a fresh `called = false` flag on each of its own
invocations and returns an inner wrapper closed over it. On the first
entry, the flag flips before anything else runs, all arguments spread
through to `fn`, and whatever `fn` computed goes straight back out —
indistinguishable from calling `fn` directly, which is exactly what
"identical to the original" demands for that one call. On every later
entry the flag already reads true, so the wrapper short-circuits: it
hands back `undefined` and never touches `fn` again.

Nothing beyond the flag needs remembering. The contract only divides
calls into "first" and "every other", not particular arguments or
results, so a boolean beats any key-based memo structure; the first
result is deliberately recomputed-then-discarded by design since the
driver re-derives the value from the underlying function itself.

**Complexity:** `O(1)` time per returned-function call, `O(1)` space per
`once()` instance.
