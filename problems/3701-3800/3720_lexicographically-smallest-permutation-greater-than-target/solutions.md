# Solutions — Lexicographically Smallest Permutation Greater Than Target

## Greedy match with a remembered bump point

Every permutation strictly greater than target agrees with target on some
prefix and then places a strictly larger letter at the first differing spot,
and a longer agreement is always smaller because it defers that first
difference. So the answer's shape is fixed: match target left to right for as
long as possible, then become greater at exactly one position. Walk once
holding letter counts of s still unused; at each position i, first record the
smallest available letter strictly greater than target[i] together with a
snapshot of the counts — that is the latest viable bump point — and then, if
target[i] itself is still available, consume it and move on.

The walk ends two ways, and both fall back to the most recently recorded bump
point. If some target[i] can no longer be matched, no permutation shares a
longer common prefix, so bumping any later is impossible and earlier bumps are
strictly worse; emit the matched prefix, the remembered larger letter, and
then every leftover letter in ascending order, which is the smallest tail any
fixed multiset allows. If instead all of target gets matched, the string built
so far equals target and equality does not count, so the same fallback applies
— the last recorded bump during the walk. When no position ever offered a
larger letter, every permutation of s is at most target and the empty string
comes back.

Each of the n positions scans a fixed 26-letter alphabet once and each
recorded snapshot costs 26 counters, so the walk takes O(n) time with the
alphabet as the constant, and rebuilding the answer from the winning snapshot
is one more linear sweep.

**Complexity:** `O(n)` time, `O(n)` space.
