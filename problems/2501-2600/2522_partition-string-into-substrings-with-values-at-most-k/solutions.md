# Solutions — Partition String Into Substrings With Values at Most K

## Greedy maximal pieces

Reading left to right, the piece that starts at position `i` should be as
long as possible. If some optimal partition cuts the first piece shorter,
the cut it leaves unmade can simply be adopted by the next piece: any
suffix partition that follows a shorter first piece also legalizes the
partitions that follow a longer one, because the leftover value only
shrank. So extending the current piece while its value stays `<= k` uses
the minimum possible number of pieces — this is a standard exchange
argument for interval-partitioning greed.

The scan keeps the running value of the current piece. For each digit,
tentatively append it (`value * 10 + digit`); if the result stays within
`k`, the piece continues. Otherwise the current piece closes before this
digit and the digit opens a fresh one — which is exactly where an answer
of `-1` can arise: if the lone digit already exceeds `k`, no good
partition exists at all, since every substring of length 2 or more has a
larger value than its last digit.

`s.length` can reach `10⁵` and each appended digit tentatively reaches
`k * 10 + 9 <= 10¹⁰ + 9`, beyond 32-bit range, so the running value is
kept in 64-bit in the languages with fixed-width integers (JavaScript's
Number is exact well below `2⁵³`). The piece count never exceeds
`s.length <= 10⁵`.

**Complexity:** `O(n)` time, `O(1)` space.
