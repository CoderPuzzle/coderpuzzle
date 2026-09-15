# Solutions — Longest Common Prefix Between Adjacent Strings After Removals

## Prefix and Suffix Adjacent-LCP Maxima

Removing `words[i]` barely disturbs the adjacency structure: every
adjacent pair of the original array survives except the two that touched
`i`, and exactly one new pair — `(i-1, i+1)` — appears. So
`answer[i]` is the maximum of three values: the best adjacent-LCP entirely
left of `i`, the best one entirely right of `i`, and the LCP of the two
new neighbours. Nothing else about the array matters.

Precompute `adj[j] = lcp(words[j], words[j+1])` in one linear scan over
the characters. Prefix maxima `pre[i] = max(adj[0..i-2])` and suffix
maxima `suf[i] = max(adj[i+1..n-2])` then give, for every removal, the
best surviving old pair in constant time; the new pair
`(words[i-1], words[i+1])` is compared directly for interior indices.
Each `answer[i]` combines the three candidates with two `max` calls. The
"no adjacent pairs remain" case (`n ≤ 2`) and the "none share a common
prefix" case fall out naturally, since empty maxima are 0.

The total character work is bounded: computing all `adj` entries and all
interior new-pair LCPs each costs at most the summed string lengths, and
the maxima arrays are index arithmetic. The result is linear in the input
size, which the sum-length constraint caps at `10⁵`.

**Complexity:** `O(L + n)` time where `L` is the summed string length,
`O(n)` space.
