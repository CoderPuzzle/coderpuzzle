# Solutions — Minimum Number of Swaps to Make the String Balanced

## Count negative prefixes with a running balance

Walk the string once while tracking `balance = #'[' - #']'` seen so far. A
string is balanced exactly when every prefix has non-negative balance and the
total is zero. Since `s` contains equal numbers of both brackets, the total is
zero by construction, so the only violations are prefixes whose balance dips
below zero.

Each such negative prefix forces one swap. The optimal swap pairs the offending
`']'` with the rightmost still-available `'['` (per Hint 3), which undoes the
deficit by turning that `']'` into a `'['` and turning the far `'['` into a
`']'`. In the running-balance view this is exactly `balance += 2` — the swap
cannot make any earlier prefix worse, and it restores the current prefix to
non-negative. Counting these restorations gives the minimum number of swaps.

The answer fits in a 32-bit integer: the worst case, `"]]]…[[["`, needs at most
`n / 4 = 250000` swaps for `n = 10⁶`.

**Complexity:** `O(n)` time, `O(1)` space.
