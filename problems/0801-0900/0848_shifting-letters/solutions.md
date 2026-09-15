# Solutions — Shifting Letters

## One right-to-left scan with a suffix total

Every letter ends up moved by exactly the number of shift operations that
touch it, and `shifts[i]` touches precisely the letters at indices `0..i` —
so letter `i` is advanced once for each `j >= i`, meaning its total shift is
the suffix sum `shifts[i..n-1]`. That single observation collapses the whole
process: instead of replaying the prefix operations, one scan from the right
carries a running total that is already the correct shift for the letter it
stands on, and each letter is placed in one step as `(c + total) % 26`, the
modulo landing the `z` → `a` wrap exactly because shifts are never negative.
Example 1 shows the totals: 9, 5 + 9 = 14, 3 + 5 + 9 = 17, and `a`, `b`, `c`
advanced by 17, 14, 9 give `r`, `p`, `l`.

The one trap is width. A suffix sum can reach 10⁵ shifts of magnitude 10⁹,
i.e. 10¹⁴ — nowhere near the 32-bit ceiling of about 2.1 · 10⁹ — so the
running total is a 64-bit integer in the fixed-width ports and stays exact in
JavaScript and TypeScript, where 10¹⁴ sits far below the 2⁵³ exactness bound
of a number. The reduction modulo 26 can then happen per step on the total
before it meets the letter, keeping the final addition tiny in every
language.

**Complexity:** `O(n)` time, `O(n)` space.
