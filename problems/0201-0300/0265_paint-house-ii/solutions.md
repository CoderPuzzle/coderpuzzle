# Solutions — Paint House II

## Smallest and second-smallest endings

Painting the row left to right, the next house needs the cheapest totals
that leave the previous house painted each of the `k` colors, but almost
all of that detail is wasted: every color except one extends the same
smallest previous ending, and the one exception — the smallest's own
color, barred by the adjacency rule — takes the second smallest instead.
So three numbers carry the whole state between houses: the smallest
ending, the second smallest, and which color holds the smallest.

The code scans each cost row once, computing every ending as that color's
cost plus the smallest previous ending, or the second smallest when the
color is the previous smallest's. The next row's smallest, second
smallest, and argmin color are tracked in the same pass, so there is no
table and no second loop over `k`. The state starts as `0, 0, -1`: the
missing color matches no real index, so the first row's endings are simply
its own costs. Equal endings push the tie into the second smallest, which
is exactly right — when two colors tie for cheapest, the smallest's own
color can still be preceded by the other one at the same price.

Taking the cheapest color house by house fails as soon as every row's
cheapest is the same color: in `[[5,6,7,8,9],[1,20,20,20,20]]` opening
with the 5 forces a 20 next, while one extra coin at the first house
unlocks the cost-1 paint and finishes at 7. The program carries both best
endings forward and never makes that blind choice. At the constraint
ceiling the answer is at most `20 * 100 = 2000`, far inside 32-bit range.

**Complexity:** `O(nk)` time, `O(1)` space.
