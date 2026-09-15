# Solutions — Minimum Steps to Convert String with Operations

## Partition DP with mutual-pair swap counting

Each part's indices are independent of every other part, so the total cost
is additive and a DP over prefixes applies: `best[end]` is the minimum
cost of fixing the first `end` characters, extended by trying every last
part `word1[start..end-1]`. Within one part, an index may serve at most
one swap, one replace, and one reversal, which constrains any schedule to:
at most one reversal (it touches every index of the part), a set of
disjoint swaps, and replaces — and since permutation ops commute and
replaces write final letters, some optimal schedule permutes first and
replaces afterwards. A swap is only worth taking when it fixes two
positions at once: positions `p`, `q` with `s[p] == t[q]` and `s[q] ==
t[p]`, a _mutual pair_. Pairable positions are exactly the mismatch types
`(a, b)` — `s[p] = a`, `t[p] = b` — whose mirror type `(b, a)` is also
present, and each such type pair forms a complete bipartite graph, so the
maximum number of disjoint mutual-pair swaps is
`Σ min(cnt[a][b], cnt[b][a])` over the type counts. Every unpaired
mismatch costs one replace, giving the part cost
`wrong − pairs`; trying the part reversed first just shifts the alignment
of the window and costs one extra operation, so
`cost(i, j) = min(wrong − pairs, 1 + wrong' − pairs')`.

The `n ≤ 100` bound makes it cheap to evaluate every window `[i, j]`
directly: rebuild both type-count matrices in one scan over the window and
read the swap matching off the 26×26 table. Answer values are at most `n`,
so 32-bit arithmetic suffices everywhere.

**Complexity:** `O(n³ + 26² · n²)` time — window scans dominate at
`O(n³)` — and `O(n²)` space.
