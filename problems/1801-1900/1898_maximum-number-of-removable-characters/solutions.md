# Solutions — Maximum Number of Removable Characters

## Binary search on k with a subsequence check

Feasibility is monotone: if `p` is still a subsequence after removing the first `k` indices of `removable`, it is still a subsequence after removing any shorter prefix, because fewer deletions only restore characters. So the set of workable `k` values is an interval starting at 0, and the answer is its right endpoint — found by binary search over `[0, len(removable)]` with the upper-mid form `(lo + hi + 1) // 2` so the search converges on the largest feasible value rather than stalling one below it.

The check for a given `k` is the classic greedy subsequence scan. The first `k` removable indices go into a set, then a single pointer walks `s`: positions in the set are skipped, and otherwise a match against the current character of `p` advances the `p` pointer. Matching each character of `p` at the earliest possible opportunity is optimal for subsequence containment, so `p` survives exactly when its pointer reaches the end.

Each check costs one pass over `s` plus building the removed set, and only a logarithmic number of checks is needed; writing `r` for `len(removable)`, that is `O(log r)` checks at `O(n + r)` each. The base case `k = 0` is always feasible (the problem guarantees `p` starts as a subsequence), so the search never fails outright.

**Complexity:** `O((n + r) log r)` time, `O(r)` space.
