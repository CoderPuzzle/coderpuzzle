# Solutions — Minimum Increase to Maximize Special Indices

A peak (an index that strictly beats both neighbours) is created only by
raising its own value — raising a neighbour can only make the peak harder to
form. Two peaks can therefore never sit side by side, and the best arrangement
is an independent set of the interior positions: maximise how many positions
are chosen, then minimise the total cost of choosing them.

## Dynamic programming over the interior

Choosing index `i` as special costs `max(0, max(nums[i-1], nums[i+1]) + 1 -
nums[i])`: the two neighbours of a chosen position are never themselves chosen
(they are adjacent to it), so they keep their original values and the target is
simply to exceed the taller of them. Costs depend only on the original array,
never on the choices made elsewhere, which is what lets a single left-to-right
scan solve the whole problem.

The scan carries, for the prefix seen so far, the best pair `(count, cost)`
achievable with the current position left unchosen and the best pair with it
chosen — "best" meaning the larger count first, then the smaller cost. Moving
to the next interior position, choosing it is only legal after an unchosen
previous position, and leaving it unchosen keeps whichever of the two stored
pairs is better. Because the comparison is lexicographic on `(count, cost)`,
the final pair is exactly a maximum-cardinality set of peaks of minimum total
cost, with no need to know the maximum count in advance.

The same reasoning shows the count of peaks is capped by the largest
independent set of the interior positions, `⌈(n-2)/2⌉`, and every such set is
achievable since values can be raised without limit. The scan is linear, and
the running values are ordinary integers: each cost is at most 10⁹ and there
are at most about n/2 picks, so the answer stays comfortably within 64 bits.

**Complexity:** `O(n)` time, `O(1)` space.
