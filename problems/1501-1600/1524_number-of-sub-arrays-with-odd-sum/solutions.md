# Solutions — Number of Sub-arrays With Odd Sum

## Running counts of prefix-sum parity

A subarray `arr[i..j]` has an odd sum exactly when the prefix sums
`prefix[j]` and `prefix[i-1]` differ in parity, where `prefix[k]` is the
sum of the first `k` elements and `prefix[-1] = 0`. So instead of
recomputing sums, the algorithm walks the array once, tracking only the
parity of the running prefix sum, and counts how many earlier prefixes
were even versus odd.

Two running counters, `even` and `odd`, hold how many prefixes seen so far
(including the empty prefix before the array starts) have even and odd
parity respectively; `even` starts at 1 to account for that empty prefix.
At each element the running parity flips only when the element itself is
odd. If the new parity is odd, every earlier even-parity prefix pairs with
it to form an odd-sum subarray, so the answer accumulates `even` and `odd`
is incremented; if the new parity is even, it accumulates `odd` and `even`
is incremented instead. The running total is kept in a 64-bit accumulator
(and reduced modulo `10⁹ + 7` at each step, or once at the end) because it
can grow to roughly `n² / 2`, which overflows a 32-bit integer well before
the array reaches its maximum length.

**Complexity:** `O(n)` time, `O(1)` space.
