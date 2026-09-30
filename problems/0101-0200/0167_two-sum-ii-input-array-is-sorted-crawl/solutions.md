# Solutions — Two Sum II - Input Array Is Sorted

The ordering is the only leverage the sorted input offers, and one search
spends it: two markers converge from the ends of the array, and every
comparison retires one endpoint with a monotonicity proof — no extra
memory is spent remembering anything but the two indexes.

## Two Pointers

Without extra memory the only leverage left is the ordering, and the ordering
is enough. Put one marker on the first value and another on the last, and ask
what their sum tells you. If it falls short of `target`, then the smallest
value in the range is hopeless: its best remaining partner is exactly the value
under the right marker, and even that partner was too small. Nothing further
inside the range can rescue it, so the left marker steps inward. If instead the
sum overshoots, the same argument retires the largest value — its most modest
available partner is the one under the left marker, and even that overshot.

![On `[2,7,11,15]` with target 9 each comparison certifies the discarded
endpoint — `2 + 15 = 17` proves 15 and `2 + 11 = 13` proves 11 cannot belong
to the pair — until `2 + 7 = 9` lands on `[1,2]`.](figures/solution-certified-endpoint-retire.svg)

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
