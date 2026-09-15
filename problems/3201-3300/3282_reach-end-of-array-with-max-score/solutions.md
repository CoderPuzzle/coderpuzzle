# Solutions — Reach End of Array With Max Score

Every hop is paid at its takeoff spot: the score of `i -> j` is distance
times `nums[i]`, so what matters is how long each position can keep
earning its own value before the path moves on to something strictly
better.

## Nearest-greater hops

From any position `i`, let `j` be the nearest index after `i` whose value
exceeds `nums[i]`. Everything strictly between them is at most `nums[i]`,
so take any path and look at its prefix until it first lands on some
`q >= j`: telescoping its legs over exactly the same ground, each leg
earns at most `nums[i]` per unit of distance, making the whole prefix
worth no more than `(q - i) * nums[i]`. Replacing that prefix with the
single hop `i -> j` plus `j -> q` keeps every distance identical while
putting the `j -> q` leg on the strictly larger rate `nums[j]` — an
exchange that never loses. When no larger value remains to the right, the
same telescoping bound caps the rest of any path at
`(n - 1 - i) * nums[i]`, which jumping straight to the last index
collects exactly. The optimal play is therefore fixed: repeatedly hop to
the nearest strictly greater value, defaulting to the last index once
none exists.

Precompute those nearest greater neighbors in one right-to-left pass with
a monotonic stack of candidates whose neighbor is still unknown — popping
entries whose values do not exceed the current element leaves exactly the
nearest greater one on top, and an empty stack means the default hop to
the last index. Walking that chain from index 0 and summing each hop's
distance times the takeoff value yields the answer.

With lengths up to `10⁵` and values up to `10⁵`, a single hop can be
worth nearly `(n - 1) * max(nums)` — about `10¹⁰`, far beyond 32-bit
range — so typed languages accumulate in 64-bit integers; JavaScript's
Number stays exact because the total is below `2⁵³`.

**Complexity:** `O(n)` time, `O(n)` space.
