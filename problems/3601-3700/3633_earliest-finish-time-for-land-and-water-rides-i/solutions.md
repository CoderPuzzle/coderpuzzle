# Solutions — Earliest Finish Time for Land and Water Rides I

## Every pair, both orders

Delaying a boarding past a ride's opening can never finish that ride
earlier, and finishing the first ride earlier never pushes the second
boarding later: the second leg starts at whichever is larger, the first
ride's finish time or the second ride's opening time. So once the pair of
rides and their order are fixed, the entire schedule is forced — board the
first ride the moment it opens, then board the second at `max(finish,
opening)`.

That collapses the problem to a flat sweep. For each land ride `i` and water
ride `j`, price both orders: land first finishes at
`max(landStartTime[i] + landDuration[i], waterStartTime[j]) +
waterDuration[j]`, and water first is the mirror image. The answer is the
minimum over all `n · m` pairs times two orders — each combination priced in
constant time.

Nothing smarter is needed at these sizes. With `n, m <= 100` and every value
at most 1000, the largest possible finish time is 3000, comfortably inside
32-bit range, so the tag-list machinery — sorting, two pointers, binary
search — stays in its box.

**Complexity:** `O(n·m)` time, `O(1)` space.
