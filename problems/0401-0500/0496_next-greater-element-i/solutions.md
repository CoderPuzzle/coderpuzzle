# Solutions — Next Greater Element I

## Monotonic Stack with a Hash Map

Every query in `nums1` is answered by a fact about `nums2`, so all the real work happens in one left-to-right scan of `nums2`. The scan keeps a stack of values still waiting for their next greater element; when the current value exceeds the stack top, it is by construction the _first_ greater value to the right of every popped element (anything closer and greater would already have popped them). Each popped value records `next_greater[value] = current`, and the current value then waits on the stack in turn.

Because the stack holds values in non-increasing order — a new value pops everything smaller and sits below only larger or equal values — each element of `nums2` is pushed exactly once and popped at most once, making the whole scan linear despite the nested loop. Elements still on the stack at the end have nothing greater to their right and map to `-1`.

With the map complete, each `nums1` entry is a constant-time lookup, and the guarantees do the rest: all integers are unique, so mapping by value is unambiguous, and `nums1` is a subset of `nums2`, so every lookup hits. With `n1` and `n2` the lengths of the two arrays, the stack and map are sized by `n2` and the output by `n1`, matching the follow-up's demand for a linear-time solution.

**Complexity:** `O(n1 + n2)` time, `O(n2)` space.
