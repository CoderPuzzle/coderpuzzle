# Solutions — Count Distinct Numbers on Board

The daily procedure looks open-ended, but the board's content is fully
determined by one divisibility chain, and a billion days is vast
overkill — the whole cascade finishes in at most `n − 1 ≤ 99` days.

## Decrement chain to the closed form

Any number `x ≥ 2` sitting on the board summons `x − 1` on the next
day, because `x % (x − 1) == 1`. Starting from `n`, day after day the
chain `n → n − 1 → n − 2 → …` therefore fires, and every integer in
`[2..n]` eventually lands on the board. Nothing outside that range can
appear: numbers are only ever _placed_, so nothing exceeds the initial
`n`; below, `i = 1` never qualifies (`x % 1 == 0 ≠ 1`) and any other
qualifying `i` satisfies `2 <= i <= n`, keeping additions inside the
range. The final board is exactly `{2,…,n}`, hence `n − 1` distinct
integers.

The lone exception is `n = 1`: with only `1` present and no valid move,
the board stays `{1}` forever, so the answer is `1`. One comparison
against the floor of the constraint range therefore solves the problem
in constant time.

**Complexity:** `O(1)` time, `O(1)` space.
