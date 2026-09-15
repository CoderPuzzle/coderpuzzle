# Random Pick with Weight

## Description

You are given a 0-indexed array of positive integers `w` where `w[i]`
describes the weight of the `i`-th index.

You need to implement the function `pickIndex()`, which randomly picks an
index in the range `[0, w.length - 1]` (inclusive) and returns it. The
probability of picking an index `i` is `w[i] / sum(w)`.

For example, if `w = [1, 3]`, the probability of picking index `0` is
`1 / (1 + 3) = 0.25` (i.e. `25%`), and the probability of picking index `1`
is `3 / (1 + 3) = 0.75` (i.e. `75%`).

Implement the `Solution` class:

- `Solution(int[] w)` Initializes the object with the array `w`.
- `int pickIndex()` Randomly picks an index in the range
  `[0, w.length - 1]` and returns it. The probability of picking an index
  `i` is `w[i] / sum(w)`.

### Statistical judging

`pickIndex` samples with probability `w[i] / sum(w)`, exactly as on
LeetCode — the judge verifies this statistically rather than comparing
single draws. Each judged `pickIndex` is invoked thousands of times (up to
~300000 draws), every returned index must be a legal index of `w`, and the
empirical frequency of each index must fall within a tolerance band of its
probability `w[i] / sum(w)`.

Accumulating that much evidence per bucket bounds the statistically judged
weight arrays to at most ~100 indices with balanced-enough weights; a
maximum-length all-equal array is still fully validity-checked (every draw
must return a legal index, with the per-index frequencies merged).

### Example 1

```text
Input:
["Solution", "pickIndex"]
[[[1]], []]
Output: [null, 0]
Explanation:
Solution solution = new Solution([1]);
solution.pickIndex(); // return 0. The only option is to return 0 since
                      // there is only one element in w.
```

### Example 2

```text
Input:
["Solution", "pickIndex", "pickIndex", "pickIndex", "pickIndex", "pickIndex"]
[[[1, 3]], [], [], [], [], []]
Output: [null, 1, 1, 1, 1, 0]
Explanation:
Solution solution = new Solution([1, 3]);
solution.pickIndex(); // return 1. It is returning the second element
                      // (index = 1) that has a probability of 3/4.
solution.pickIndex(); // return 1
solution.pickIndex(); // return 1
solution.pickIndex(); // return 1
solution.pickIndex(); // return 0. It is returning the first element
                      // (index = 0) that has a probability of 1/4.
```

Since this is a randomization problem, multiple answers are allowed: any
sequence of 0s and 1s with roughly three times as many 1s as 0s is a
correct output for Example 2.

### Constraints

- `1 <= w.length <= 10⁴`
- `1 <= w[i] <= 10⁵`
- `pickIndex` will be called at most `10⁴` times.

## Hints

### Hint 1

Picture the weights laid end to end along an interval of length `sum(w)`:
segment `i` occupies `[prefix(i), prefix(i+1))` and has length `w[i]`. A
uniform point on the interval falls in segment `i` with probability exactly
`w[i] / sum(w)` — the inverse-CDF view of the required distribution.

### Hint 2

The segment boundaries are the prefix sums, and they are sorted, so locating
which segment contains a uniform draw is a binary search: `O(log n)` per
call after an `O(n)` construction.

### Hint 3

Fix one boundary convention and keep it consistent — for instance draw
`target ∈ [1, total]` and return the last index whose prefix sum is below
`target`. An off-by-one that compares with `>` instead of `>=` silently
shifts one unit of mass onto a neighbor, and the judge's per-index frequency
check is exactly sensitive enough to notice.
