# Number of Ways to Paint Sheets

## Description

You are given an integer `n` representing the number of sheets.

You are also given an integer array `limit` of size `m`, where `limit[i]` is
the maximum number of sheets that can be painted using color `i`.

You must paint all `n` sheets under the following conditions:

- Exactly two distinct colors are used.
- Each color must cover a single contiguous segment of sheets.
- The number of sheets painted with color `i` cannot exceed `limit[i]`.

Return an integer denoting the number of distinct ways to paint all sheets.
Since the answer may be large, return it modulo `10⁹ + 7`.

Note: Two ways differ if at least one sheet is painted with a different color.

### Example 1

```text
Input: n = 4, limit = [3,1,2]
Output: 6
Explanation: For each ordered pair (i, j), where color i is used for the first
segment and color j for the second segment (i != j), a split of x and 4 - x is
valid if 1 <= x <= limit[i] and 1 <= 4 - x <= limit[j].

Valid pairs and counts are:

(0, 1): x = 3
(0, 2): x = 2, 3
(1, 0): x = 1
(2, 0): x = 1, 2

Therefore, there are 6 valid ways in total.
```

### Example 2

```text
Input: n = 3, limit = [1,2]
Output: 2
Explanation: For each ordered pair (i, j), where color i is used for the first
segment and color j for the second segment (i != j), a split of x and 3 - x is
valid if 1 <= x <= limit[i] and 1 <= 3 - x <= limit[j].

Valid pairs and counts are:

(0, 1): x = 1
(1, 0): x = 2

Hence, there are 2 valid ways in total.
```

### Example 3

```text
Input: n = 3, limit = [2,2]
Output: 4
Explanation: For each ordered pair (i, j), where color i is used for the first
segment and color j for the second segment (i != j), a split of x and 3 - x is
valid if 1 <= x <= limit[i] and 1 <= 3 - x <= limit[j].

Valid pairs and counts are:

(0, 1): x = 1, 2
(1, 0): x = 1, 2

Therefore, there are 4 valid ways in total.
```

### Constraints

- `2 <= n <= 10⁹`
- `2 <= m == limit.length <= 10⁵`
- `1 <= limit[i] <= 10⁹`

## Hints

### Hint 1

Sort limit and use binary search (lower_bound) to compute num_ge(t), the
number of colors with limit >= t.

### Hint 2

For a split x, count ordered pairs (i, j) with i != j as num_ge(x) * num_ge(n

- x) - num_ge(max(x, n - x)).

### Hint 3

Note that num_ge(x) and num_ge(n - x) change only when x crosses 1, n - 1,
L + 1, or n - L for some L in limit.

### Hint 4

Collect all such critical x values, sort and deduplicate them, and treat the
answer as constant between consecutive values.
