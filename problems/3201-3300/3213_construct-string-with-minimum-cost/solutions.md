# Solutions — Construct String with Minimum Cost

## Suffix DP over distinct word lengths, rolling-hash filtered

Building `target` left to right means every partial string is a prefix of it,
so the state worth remembering is just a position: let `dp[i]` be the minimum
cost to assemble the suffix `target[i:]`, with `dp[len(target)] = 0`. Each
position extends every word that matches its next characters, taking
`dp[i + len(word)] + cost`. Two collapses keep that cheap: duplicate words
reduce to their cheapest occurrence, and per position only _distinct_ word
lengths matter — since total word length is capped, their count never exceeds
about `sqrt(2 * total)`. Greedy longest-match fails (a pricey long word can
block two cheap ones), and an unreachable `dp[0]` is the `-1` case.

Candidate lengths are scanned ascending while a wrapping u64 polynomial hash
of `target[i:i+L)` extends by one character per step. The hash is only a
filter: when it hits the bucket for length `L`, the real map of words to
cheapest cost is probed with the exact substring. Correctness therefore never
rests on the hash — a collision merely wastes one probe — while misses skip
both the slice and the probe entirely.

Costs accumulate in 64-bit room throughout: the answer is bounded by
`len(target) * max(cost) <= 5 * 10⁸`, so wide accumulators keep every
intermediate sum comfortable even though the final value fits 32 bits.

**Complexity:** `O(len(target) · sqrt(total(words)) + total(words))` time
(the square-root factor caps the distinct word-length count),
`O(total(words))` space.
