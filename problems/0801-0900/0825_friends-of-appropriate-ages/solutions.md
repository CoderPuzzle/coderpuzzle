# Solutions — Friends Of Appropriate Ages

The request rule looks at ages only, never at positions, so any two people of
the same age are interchangeable: they make exactly the same requests. That
observation collapses the problem from `n` people to the at most 120 distinct
age values the constraints allow, and turns counting requests into arithmetic
over ordered pairs of age values.

## Counting by age value

Bucket everyone into a 121-slot table indexed by age (ages run 1 to 120), then
judge each ordered pair of present age values `(a, b)` once: an `a`-aged
person requests a `b`-aged one unless blocked, and the block is exactly the
statement's three conditions — `b <= 0.5 * a + 7` (written in exact integer
form as `2*b <= a + 14`, since ages are integers), `b > a`, or
`b > 100 && a < 100`. When the pair passes, every one of the `count[a]`
senders requests every one of the `count[b]` receivers, adding
`count[a] * count[b]`. The diagonal `a == b` is the one place the product
overcounts: a person never requests themself, so `count[a] * count[a]` shrinks
to `count[a] * (count[a] - 1)` — which is also why a lone person of any age
contributes nothing.

The boundaries are where care pays off. The half-age rule is barely
asymmetric on equal ages: two 15-year-olds request each other because
`15 > 0.5 * 15 + 7 = 14.5`, while two 14-year-olds do not because
`14 <= 14` — Example 1's `[16,16]` answers 2 for the same reason. And the
`b > a` block makes requests directional, never mutual by construction:
Example 2 records `17 -> 16` and `18 -> 17` but no `18 -> 16`, since
`16 <= 0.5 * 18 + 7 = 16` blocks exactly that pair, while Example 3's seniors
`110` and `120` fire three one-way requests down the line. The grand total is
bounded by the ordered pairs `n * (n - 1)`, about `4 * 10^8` at
`n = 2 * 10^4` — comfortably inside a 32-bit integer, so the counts and
products need no wider arithmetic.

**Complexity:** `O(n + A²)` time, `O(A)` space.
