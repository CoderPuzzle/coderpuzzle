# Solutions — Maximum Bitwise AND After Increment Operations

## Greedy bit construction with cheapest-m costs

The answer is a bitmask, and the feasibility of a mask is downward closed:
if some m elements can each be raised, within a total of k increments, to
values that all carry every bit of a mask, the same raises carry every bit
of any sub-mask. So the mask can be decided bit by bit from the top:
starting from `res = 0`, test `res | 1<<b` for each bit from 30 down to 0
and keep the bit whenever the candidate is feasible. A feasible candidate
sharing the decided prefix but setting the current bit dominates every
completion that skips it, so after each step `res` equals the optimum
restricted to the bits decided so far.

Testing a candidate decomposes per element, because an increment spent on
one index never helps another: element `i` needs the cheapest value
`t >= nums[i]` with every candidate bit set, and the candidate is feasible
exactly when the m smallest per-element costs `t - nums[i]` sum to at most
k — the raises are independent, so picking the m cheapest is optimal. That
cheapest `t` has a closed form. Let `missing = cand & ~nums[i]`; when it is
empty the cost is 0. Otherwise let `h` be its highest bit: any valid target
must overtake `nums[i]` at some bit `d >= h` (below `h` the missing bit
`h` itself stays missing), and overtaking strictly above `h` discards more
of `nums[i]` than necessary, so the minimum keeps `nums[i]`'s bits above
`h`, sets bit `h`, and fills the candidate's bits below `h`.

Values are at most `10⁹` and k at most `10⁹`, so no raised value — and the
answer itself — can exceed `2 × 10⁹ < 2³¹`: bits 30 through 0 are all
there are, and everything on the wire fits 32 bits. One element's cost can
still approach `2³¹`, and summing `5 × 10⁴` of them approaches
`1.1 × 10¹⁴`, so the fixed-width languages accumulate the cost sum in 64
bits, while JavaScript's doubles hold every integer involved exactly, far
inside `2⁵³`.

**Complexity:** `O(31 · n log n)` time, `O(n)` space.
