# Solutions — Minimum Deletion Cost to Make All Characters Equal

## Per-letter cost sums

Every valid plan leaves a non-empty string made of one repeated character, so
a plan is exactly "pick a letter `c` and delete every character that is not
`c`": deleting an occurrence of `c` itself can never help, because costs are
positive and equal characters may all stay. Keeping `c` therefore costs the
sum of `cost[i]` over every position with `s[i] != c`, and the answer is the
minimum of that quantity over the 26 lowercase letters.

Equivalently, the answer is the total of all costs minus the largest
per-letter cost sum. One pass adds `cost[i]` into a 26-slot table indexed by
`s[i]`; the result is `sum(totals) - max(totals)`, and the maximum always
exists because `n >= 1`.

With `n` up to 10⁵ and each cost up to 10⁹, the running sums reach 10¹⁴,
beyond 32-bit range, so the accumulators and the return value use 64-bit
arithmetic in the typed languages. Python integers are unbounded, and the
JavaScript totals stay below 10¹⁴ < 2⁵³, where `Number` arithmetic on whole
integers is exact.

**Complexity:** `O(n)` time, `O(1)` space (26 counters).
