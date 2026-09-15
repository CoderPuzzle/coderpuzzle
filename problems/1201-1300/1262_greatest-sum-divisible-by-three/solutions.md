# Solutions — Greatest Sum Divisible by Three

## Residue-class DP over the running best

Track one number per residue class: `best[0..2]` is the greatest achievable
sum with that sum modulo 3, over the prefix seen so far. Every element joins
each existing class: `best[(r + x) % 3]` improves to `best[r] + x` when that
beats the current entry. After the last element, `best[0]` is exactly the
answer — the largest subset sum divisible by three.

The invariant is self-maintaining: each update only ever raises a class's
champion, and any optimal subset is reachable because its elements arrive one
at a time. Sums fit comfortably in 32 bits (4 * 10^4 elements of at most
10^4), but the intermediate "drop the smallest one or two remainders" view of
the same fact — total minus the cheapest way to shed `total % 3` — is what a
greedy reading gives; the DP finds it without sorting.

**Complexity:** `O(n)` time, `O(1)` space.
