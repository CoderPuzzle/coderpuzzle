# Solutions — Count Non Decreasing Arrays With Given Digit Sums

A naive count walks the decision tree: pick a value for the first position,
then a value at least as large for the next, and so on, restricted at each
step to numbers whose digit sum equals that position's required target. The
value range is only 0..5000, but the array length reaches 1000, so a
memoized walk over `(position, last value)` states — five million of them —
is far too heavy.

## Candidate-group dynamic programming

The digit-sum constraint decouples the problem from most of the value range.
For each possible digit sum there is a short, sorted list of values in
0..5000 that realize it — at most 365 values, and none at all for sums above
31 (the digit sum of 4999). A valid array is then a choice, per position, of
one value from that position's group, with the chosen values non-decreasing
across positions.

The DP therefore keeps a state per _candidate_, not per value. `dp[j]`
counts the valid prefixes that end exactly at the j-th candidate of the
previous position's group. To advance into the next group, build the prefix
sums of `dp`; for each candidate `v` of the new group, the number of
compatible predecessors is the count of previous-group values `<= v`, found
by one binary search (`upper_bound`) into the sorted previous group. Because
values are distinct, non-decreasing is exactly "previous value <= current
value", so that one lookup sums every compatible way.

Each position costs a linear prefix build plus a logarithmic lookup per new
candidate, and every group stays small, so a thousand positions run well
within limits. All arithmetic is taken modulo 10⁹ + 7; a prefix sum is at
most 365 × MOD before reduction, comfortably inside 64-bit integers and
even JavaScript's exact `2⁵³` range, so no BigInt is needed.

**Complexity:** `O(n · C log C)` time, `O(C)` space, where `C = 365` is the
largest digit-sum group size.
