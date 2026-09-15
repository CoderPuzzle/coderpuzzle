# Solutions — Sum of All Subset XOR Totals

XOR is bitwise, so the total sum decomposes per bit. A bit contributes
`2^(bit)` times the number of subsets in which it appears an odd number
of times — and among subsets containing at least one element carrying
that bit, exactly half have odd parity: pairing each such subset with the
same subset plus/minus one fixed carrier flips parity perfectly.

## OR-times-power-of-two identity

Collect `or_all`, the bitwise OR of every element: a bit survives into a
subset's XOR only if some element supplies it, and the count of subsets
where its parity is odd equals exactly `2^(n-1)` (choose any subset of
the other `n-1` positions freely; the carrier membership then decides
parity one-to-one). The answer is therefore `or_all * 2^(n-1)`. For
`n = 12` and values up to 20 this stays comfortably inside 32 bits.

One pass over the array.

**Complexity:** `O(n)` time, `O(1)` space.
