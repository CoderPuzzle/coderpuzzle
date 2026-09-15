# Solutions — Total Hamming Distance

## Count set bits one position at a time

A pair of values differs at a bit position exactly when one of the two has the
bit set and the other does not. So instead of walking the pairs, fix one bit
position at a time and look at the whole array: if `c` of the `n` values carry
that bit, the remaining `n - c` do not, and every one of the `c` set values
pairs with every one of the `n - c` unset ones — the position contributes
`c * (n - c)` differing pairs. Summing that product over all positions counts
every (pair, bit) difference exactly once, which is precisely the sum of
Hamming distances over all pairs.

The first example shows the accounting by hand: `nums = [4, 14, 2]` is `0100`,
`1110`, and `0010`. Bit 3 is set in one value (`1 * 2 = 2` pairs differ
there), bit 2 in two (`2 * 1 = 2`), bit 1 in two (`2 * 1 = 2`), and bit 0 in
none (`0 * 3 = 0`) — the total is `6`, the same value the pairwise derivation
reaches. Since `0 <= nums[i] <= 10⁹ < 2³⁰`, only thirty positions can ever
hold a set bit; the loop runs a fixed thirty-one passes over the array, so its
cost is bounded by the word width rather than by any input's magnitude.

No intermediate is ever wider than the answer itself. Each per-position
product is at most `(n / 2)² = 25,000,000` at the `n = 10⁴` ceiling, and
thirty positions of those sum below `7.5 × 10⁸` — comfortably inside the
32-bit guarantee the statement makes. Python's unbounded ints never notice,
the fixed-width `int`/`i32` types hold everything exactly, and in JavaScript
and TypeScript the shifts coerce to signed 32-bit two's complement, which
values below `2³¹` — and a total below `2³¹` — never leave.

**Complexity:** `O(n)` time — a fixed 31 passes over the array — `O(1)` space.
