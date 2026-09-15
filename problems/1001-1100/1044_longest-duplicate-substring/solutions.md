# Solutions — Longest Duplicate Substring

Both attacks lean on the same fact: two appearances of one segment are two
suffixes of `s` that open with the same run of characters, however much those
appearances overlap. The suffix array makes the fact concrete — stand every
suffix in sorted order and the deepest agreement between neighbors _is_ the
answer, read off by one linear scan with no randomness anywhere. The hash
bisection stays cheaper by never ordering anything at all: it asks only
whether some width repeats, halves the search on the monotone answer, and
fingerprints windows in place of comparing them.

## Suffix Array with Kasai LCP

A repeated segment is a common prefix of two different suffixes, so the
longest one hiding in `s` is the deepest prefix any two suffixes share.
Sorting the suffixes makes that depth easy to read off: suffixes opening with
the same run cannot be separated in the order by a suffix that opens
differently, so the deepest shared prefix is always realized by some pair of
_adjacent_ suffixes. The answer is therefore the maximum LCP across
neighboring pairs of the sorted order, and the code slices that window out of
`s` at the end — or returns the empty string when every neighboring pair
disagrees from the first character on.

The sort never compares the suffixes themselves. Every suffix starts ranked
by its first letter, and each pass re-sorts them by the pair
_(`rank[i]`, `rank[i + k]`)_, where the second entry is the rank the suffix
`k` steps later already holds, a below-everything sentinel stands in past the
end of `s` — so a suffix that is a strict prefix of a longer one ranks below
it — and the pair is packed into one integer key so an ordinary comparison
sort applies. Suffixes sharing a rank after a pass agree on a prefix of
length `2k`, so each doubling of `k` doubles the compared length and
`ceil(log2 n)` passes settle the full order; the pass that leaves every rank
distinct ends the loop early. Nothing here is randomized — no hash, no
modulus, no collision to argue away — which is this family's whole character.

The neighboring depths then come from Kasai's scan instead of from
comparisons. Walking the text positions left to right, each suffix is matched
against its sorted predecessor by a single extending pointer `h`; because
both suffixes at position `i` lose exactly their first character when the
walk steps to `i + 1`, a match can shorten by at most one per step, and
paying one unit back each step keeps the pointer's total travel within `2n`
characters. The scan remembers the deepest match it has seen and where it
starts. Overlapping appearances need no handling anywhere — adjacency in the
sorted order says nothing about distance in the text, which is exactly the
freedom the problem grants.

**Complexity:** `O(n log² n)` time, `O(n)` space.

## Binary Search on Length with Double Rabin-Karp Hashing

The key structural fact is monotonicity: if a duplicated substring of length L exists, then prefixes of it give duplicated substrings of every length below L. So the set of feasible lengths is a prefix of 1..n, and binary search can find the largest feasible length. Each probe tests one candidate length L and returns the starting index of some duplicate if one exists, or -1 otherwise; the search records the best length and start seen so far and returns that window at the end.

The feasibility check is Rabin-Karp. All window hashes are computed incrementally: after seeding the hash of the first window, each slide removes the leftmost character's contribution (precomputed powers of the base) and appends the incoming character, so every window hash costs O(1). Two independent polynomial hashes (mod 10^9+7 and 10^9+9, base 26) form the key, which makes accidental collisions astronomically unlikely. As an extra safety net the code still stores the list of start positions per hash key and compares the actual windows character by character when a key repeats, so a hash collision can never produce a wrong answer — the double hash simply keeps such verifications from ever happening in practice.

Edge cases: length 0 is never probed as a success (the check returns -1 for it), and if no length works the answer is the empty string, handled by best_length staying 0. Overlapping occurrences are naturally supported because the check only compares windows, not disjoint positions. Each probe is O(n) hash work plus O(L) per verified duplicate, and there are O(log n) probes.

**Complexity:** `O(n log n)` time, `O(n)` space.
