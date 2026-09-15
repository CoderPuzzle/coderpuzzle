# Solutions — Two Sum II - Input Array Is Sorted

Two searches that both pay with the ordering instead of memory. One asks
each position a single question — is your partner in the sorted remainder?
— and lets bisection answer it; the other visits the array once, retiring
an endpoint at each end with two converging markers. Neither remembers
anything but a few indices.

## Two pointers converging from both ends

The array is already sorted, so the smallest and the largest values can speak for every candidate pair at once: their sum is the largest sum any pair involving `numbers[low]` can reach and the smallest sum any pair involving `numbers[high]` can reach. Comparing that one sum against `target` therefore rules out an entire row of the pair table — if `numbers[low] + numbers[high]` is too small, no partner can rescue `numbers[low]`; if too large, none can rescue `numbers[high]`. And since the walk keeps only two indexes, it satisfies the statement's requirement of constant extra space, which rules out the hash map that solved the unsorted version.

The code sets `low` to the first index and `high` to the last. Each round adds the two values: on a match it returns `[low + 1, high + 1]`, incrementing both because the statement's array is 1-indexed. Otherwise the too-small side steps `low` forward, or the too-large side steps `high` backward, the window shrinks by one, and the loop cannot run past the guaranteed solution. Duplicate values need no special handling — equal neighbors simply sit between the endpoints and are skipped or consumed exactly like any other value.

Every step discards an index with a one-line monotonicity argument, so the answer, which the tests guarantee is unique, is never thrown away, and the walk takes at most `n - 1` rounds.

**Complexity:** `O(n)` time, `O(1)` space.

## Two Pointers

Without extra memory the only leverage left is the ordering, and the ordering
is enough. Put one marker on the first value and another on the last, and ask
what their sum tells you. If it falls short of `target`, then the smallest
value in the range is hopeless: its best remaining partner is exactly the value
under the right marker, and even that partner was too small. Nothing further
inside the range can rescue it, so the left marker steps inward. If instead the
sum overshoots, the same argument retires the largest value — its most modest
available partner is the one under the left marker, and even that overshot.

So every comparison eliminates one endpoint with a proof attached, and the
range narrows by one position per step. Since the promised pair is never the
element being discarded, it survives every round and the markers must meet on
it. On `numbers = [-13,-6,5,9,17]` with `target = 3` the markers open on `-13` and
`17`, whose sum of `4` is one too many, so `17` leaves; `-13 + 9 = -4` falls
short and `-13` leaves; `-6 + 9 = 3` lands, and the answer is the pair of
one-based positions `[2, 4]`.

Two integer markers are the entire state, which is what makes the space
constant. The traversal visits each position at most once, since each iteration
moves one marker toward the other and they start `n - 1` apart. Duplicate
values need no special care: in `[4,4,7,7,7]` the markers close until they sit
on the two fours, which are different positions and therefore a legal pair. The
empty return at the bottom is unreachable given the uniqueness promise, and is
there only so the function is total.

**Complexity:** `O(n)` time, `O(1)` space.
