# Solutions — Minimum Changes To Make Alternating Binary String

An alternating binary string is fully determined by its first
character — there are exactly two of them: `0101...` and `1010...`.
Every operation flips one position, so the cost of reaching a target
is simply the number of positions that differ, and the answer is the
cheaper of the two fixed targets.

## Count mismatches against one target

Scan once, counting how many positions `i` hold `s[i]` different from
`i % 2` — that is the cost of the `0101...` target. The `1010...`
cost is its complement, `n - that count`, because each position
matches exactly one of the two targets. The answer is the smaller of
the two; no third target exists.

On `"0100"` only the last position breaks the `0101...` pattern, so
the costs are 1 and 3 — answer 1. On `"10"` the string already equals
one target exactly. On `"1111"` each target disagrees at two
positions. One pass, two counters' worth of arithmetic.

**Complexity:** `O(n)` time, `O(1)` extra space.
