# Solutions — Number of ZigZag Arrays I

## Direction-alternating dynamic programming

The zigzag law is entirely local. Once an array's last value and the
direction of its last step are known, nothing else about the prefix
matters: the direction must flip on the very next element, and that flip
forces the next value onto the opposite side of the current one — which
also rules out repeating a value, since a flat step is neither a rise nor
a fall. Two tables of size `r - l + 1` therefore summarize every valid
length-`i` array: `up[x]`, counting those ending at `x` with a rising last
step, and `down[x]`, ending at `x` with a falling one. Every single value
seeds both tables at length 1.

A rising-ending array may continue only onto a smaller value, so the next
layer's `down[y]` is the sum of the old `up[x]` over all `x > y`; the
mirror transition sums the old `down[x]` over all `x < y` into the next
`up[y]`. One sweep right-to-left and one left-to-right keep a running
total while rebuilding both tables, so each layer costs a linear pass over
the value range instead of comparing every ordered pair of values. After
`n - 1` layers the answer is the sum of both tables. Two rolling arrays
carry the state between layers.

Every stored value is a residue below `10⁹ + 7`, and each running total
absorbs exactly one residue per step, so even at the `n = 2000`,
`r - l + 1 = 2000` bounds no accumulator leaves the comfortable range of
64-bit integers or JavaScript's exact doubles — and nothing is ever
subtracted, so no language's remainder operator needs a sign repair.

**Complexity:** `O(n · (r - l + 1))` time, `O(r - l + 1)` space.
