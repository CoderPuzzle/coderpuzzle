# Solutions — Longest Well-Performing Interval

## Prefix Sum with First-Occurrence Map

Map each day to `+1` if it is tiring (more than 8 hours) and `-1` otherwise. A well-performing interval is then exactly a subarray whose sum is strictly positive, so the problem becomes: find the longest subarray with positive sum. Because every element is `±1`, the prefix sum changes by exactly one step at a time, which is what makes a hash-map lookup sufficient.

Scan left to right maintaining the running `prefix`. A hash map `first` records the earliest index at which each prefix value has been seen, seeded with `{0: -1}` so that intervals starting at index 0 are handled uniformly. At index `i` two cases arise. If `prefix > 0`, the whole prefix `hours[0..i]` is already well-performing and `best` can jump to `i + 1`. Otherwise the best interval ending at `i` starts right after the earliest occurrence of the value `prefix - 1`: subtracting that prefix leaves a sum of exactly 1, and because any earlier index would leave a smaller difference (values move in unit steps, and a difference of 2 or more would require passing through `prefix - 1` earlier anyway), the first occurrence maximizes the length `i - first[prefix - 1]`.

Entries are written into `first` only when the value has not appeared before, which is what keeps each stored index the leftmost one. If `prefix - 1` has never been seen, no positive-sum interval ends here and `best` is untouched.

The degenerate case falls out naturally: if there are no tiring days at all, the prefix only decreases, neither branch ever fires, and the answer stays 0.

**Complexity:** `O(n)` time, `O(n)` space.
