# Solutions — Maximum XOR of Two Numbers in an Array

## Greedy Bit Building with Prefix Set

The maximum XOR is built one bit at a time from the most significant bit down. Over 31-bit nonnegative values (the constraint caps them at `2^31 - 1`, so bits 30 down to 0 suffice), each bit of the answer is decided greedily: if any pair of numbers can achieve that bit set — while keeping the higher bits already fixed — then setting it is always at least as good as leaving it clear, since a higher bit dominates all lower bits combined.

For a given prefix mask, the code collects every number truncated to the bits considered so far. The answer's prefix `candidate = best | (1 << bit)` is achievable exactly when two numbers' prefixes `p1`, `p2` satisfy `p1 ^ p2 = candidate`, i.e. the higher (already fixed) bits differ exactly where required. Rearranged as `p1 = candidate ^ p2`, this becomes a set-membership test: iterate the prefix set and check whether `candidate ^ prefix` is also present. If any such pair exists, `best` adopts the bit; otherwise the bit is zero in every achievable maximum.

Each pass rebuilds the prefix set from scratch (an implicit 31-level radix grouping of the numbers) and does at most one O(1) hash lookup per element, so the whole scan is 31 linear passes. The loop starts from bit 30, which correctly covers every allowed input value; leading zero bits simply fail the membership test until real signal appears.

Note `i <= j` in the statement permits i = j, so a single-element array yields 0 (`x ^ x = 0`), which the algorithm returns naturally since no pair of prefixes can ever differ on any bit.

**Complexity:** `O(n)` time (31 passes, each linear in n with O(1) average hash operations), `O(n)` space.
