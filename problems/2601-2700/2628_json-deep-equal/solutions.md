# Solutions — JSON Deep Equal

Deep equality over parsed JSON is decided structurally: containers match
only same-kind against same-kind, arrays elementwise in order, objects by
key set and per-key recursion, primitives by `===`. The implementation
below walks both values side by side without ever reaching for
`lodash`'s banned `_.isEqual`.

## Iterative Pair Worklist

The traversal replaces call-stack recursion with an explicit stack of
pending value pairs, seeded with `[o1, o2]`. Each popped pair short-circuits
through `===` first (identical primitives drop out instantly), then checks
kind compatibility: an array can only face another array, and a non-null
object can only face another object, so any crossing fails immediately.
Arrays additionally require equal length before their element pairs are
pushed positionally; objects require equal key-set size plus membership of
every left key on the right before pushing matched value pairs — key
insertion order therefore never influences the verdict, which is exactly
Example 2's point, while a missing or extra key (or Example 3's number
versus string elements) dies at one of those cheap guards.

Working iteratively matters here because nesting can reach 1000 by the
constraints — a naive recursive visitor would risk blowing the runtime's
call budget on deeply nested rows, while the array-backed worklist stays
flat regardless of shape. Every value that survives all guards eventually
finds its counterpart popped and accepted, so exhaustion of the pending
list means every level agreed, including distinct-but-equal primitives,
and the answer collapses to true only then.

**Complexity:** `O(n)` time and `O(n)` space, where n counts nodes in both
values combined.
