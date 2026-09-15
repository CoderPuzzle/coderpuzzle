# Solutions — Contains Duplicate II

## Hash map from value to last index

For each position the question is only "did this exact value already appear within the previous `k` positions?" — and of all earlier copies, the one that can be nearest is the most recent. If the last occurrence of `value` is farther than `k` away, every older occurrence is farther still, so a hash map from value to its **last** index answers the question with a single lookup, replacing the `O(n · k)` scan of every trailing window.

The code makes one pass with `enumerate`, looking up before inserting. When `value` is already in the map it compares the gap `index - earlier` against `k` and returns `true` on the first success; either way it then overwrites the stored index, which is what keeps "last" true for the next copy. A first-occurrence map would not do: for `nums = [1,2,3,4,1,1]` and `k = 1` the first 1-pair is four positions apart, and only refreshing the entry lets the final adjacent pair be seen. The boundaries fall out on their own — distinct indices make the gap at least 1, so `k = 0` can never match, and `k ≥ n` admits any duplicate pair, turning the pass into plain duplicate detection.

The sliding-window set of size `k` (evicting index − `k` as the window slides) answers the same question in `O(min(n, k))` space and is the better pick when `k` is small; the last-index map is used uniformly here because one code shape covers every `k` — no eviction bookkeeping, no window overflow when `k` swallows the whole array — at the cost of one entry per distinct value. No port needs a wider integer: values sit inside ±10⁹, and index gaps are bounded by `n ≤ 10⁵`.

**Complexity:** `O(n)` time, `O(n)` space.
