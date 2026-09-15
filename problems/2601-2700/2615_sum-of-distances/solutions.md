# Solutions — Sum of Distances

## Grouped Prefix Sums

Only positions holding equal values interact, so bucket the indices by value with a dictionary of lists; each bucket is then an independent one-dimensional problem over its sorted indices. For a bucket of `m` indices, build the prefix sum of the indices themselves, which turns every distance total into `O(1)` arithmetic per occurrence.

For the `j`-th occurrence (0-based, `j > 0` means earlier ones exist) sitting at index `i`, the earlier occurrences contribute `i * j - prefix[j]` — there are `j` of them, each at distance `i - idx` — while the later ones contribute `(prefix[m] - prefix[j + 1]) - i * (m - 1 - j)`. Adding both gives `arr[i]` without any pairwise loop, which matters because a single value may dominate the array.

Every index lands in exactly one bucket and is touched a constant number of times, so the whole pass is linear beyond the initial grouping. A value with a single occurrence gets both terms equal to zero automatically, yielding `arr[i] = 0` as the problem requires.

**Complexity:** `O(n)` time, `O(n)` space.
