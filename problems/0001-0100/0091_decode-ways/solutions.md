# Solutions — Decode Ways

## Dynamic programming with two rolling counts

How a prefix can be finished depends only on its last one or two digits: the final code either stands alone as `s[i]` (legal unless it is "0") or merges `s[i-1]` and `s[i]` into one letter (legal only when the pair spells 10 through 26). The number of ways to decode the first `i` characters is therefore the ways for the first `i - 1` plus the ways for the first `i - 2`, each term gated by its digit check — the Fibonacci recurrence with two guards. Zeros are the whole subtlety: a "0" never stands alone, it survives only inside "10" or "20", and a zero that opens neither gate ("00", "30", the trailing pair in "100") drops the count to 0 from that point on.

The code keeps just the two rolling counts instead of the whole prefix table. `prev2` starts at 1 — one way to decode the empty prefix — and `prev1` at 1 or 0 depending on whether the first digit is "0"; each step forms `current` by adding `prev1` when the one-digit gate opens and `prev2` when the two-digit gate opens, then shifts the pair forward. `s = "100"` shows the kill switch at work: the second "0" opens neither gate, so `current` is 0, and every later position inherits that 0, which is exactly the statement's "impossible to decode" case. A string of ones with every gate open is plain Fibonacci growth — 45 ones already decode 1836311903 ways.

Prefix counts can pass 2³¹ - 1 while the final answer still fits the 32-bit range the statement promises (a long run of ones ending in "00" is the standard example), so the statically typed solutions accumulate in 64-bit integers and narrow once at the return. Python integers are unbounded, and JavaScript's doubles are exact far beyond the range the statement promises, so those two need no widening.

**Complexity:** `O(n)` time, `O(1)` space.
