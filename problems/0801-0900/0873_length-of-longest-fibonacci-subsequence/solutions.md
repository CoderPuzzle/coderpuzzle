# Solutions — Length of Longest Fibonacci Subsequence

## Pair DP with a Value-to-Index Map

Every Fibonacci-like subsequence is pinned down by its last two elements: if it currently ends with the ordered pair `(arr[j], arr[i])`, the element before them must have value `arr[i] - arr[j]`. So the natural DP state is `dp[(j, i)]`, the length of the longest valid subsequence ending with exactly that pair, and it extends in O(1) given the predecessor. A hash map from value to index (the array is strictly increasing, so values are unique) resolves `arr[i] - arr[j]` to an index instantly.

The loops walk `i` across the array and `j < i` over possible penultimate elements. For each pair, `need = arr[i] - arr[j]` is looked up; the guard `need < arr[j]` ensures the predecessor sits strictly left of `j` (values increase, so any smaller value has a smaller index) and rules out the degenerate case `need == arr[j]`, which would point back at `j` itself. On a hit, `dp[(j, i)] = dp.get((k, j), 2) + 1` — the earlier pair defaults to length 2 when it never started a chain — otherwise the pair begins fresh at length 2, and the maximum is tracked throughout.

A length of 2 is just two elements, but the problem requires at least three, so the result is `best` only when `best >= 3` and 0 otherwise, as when no three values satisfy the recurrence. Each of the quadratic number of pairs performs one hash lookup, so the whole scan runs in quadratic time and stores one entry per pair.

**Complexity:** `O(n^2)` time, `O(n^2)` space.
