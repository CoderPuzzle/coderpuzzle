# Solutions — Max Sum of a Pair With Equal Sum of Digits

## Keep the best two values per digit-sum bucket

Two numbers can form a pair exactly when their digit sums are equal, and
whether a pair exists depends on nothing else about the numbers — so the
digit sum is a natural bucket key. Within one bucket the best pair is
unconditionally the bucket's two largest values: any other pair from that
bucket sums to no more, and pairs from different buckets are never valid.
The answer is the largest of these per-bucket pair sums, or -1 when every
bucket holds fewer than two elements.

Sweep nums once, mapping each number's digit sum to the largest value seen
for it so far. When the current number meets an existing entry, its digit
sum already has one partner, so `entry + current` is a candidate answer;
then keep the larger of the two as the entry. Every valid pair is examined
at the moment its later element arrives, with the entry always holding the
best possible first element, so the final maximum is correct.

**Complexity:** `O(n log M)` time, `O(n)` space.
