# Best Sightseeing Pair

## Description

You are given an integer array `values` where `values[i]` represents the
value of the `ith` sightseeing spot. Two sightseeing spots `i` and `j` have a
distance `j - i` between them.

The score of a pair of sightseeing spots (`i < j`) is
`values[i] + values[j] + i - j`: the sum of the values of the sightseeing
spots, minus the distance between them.

Return the maximum score of a pair of sightseeing spots.

### Example 1

```text
Input: values = [8,1,5,2,6]
Output: 11
Explanation: i = 0, j = 2, values[i] + values[j] + i - j = 8 + 5 + 0 - 2 = 11
```

### Example 2

```text
Input: values = [1,2]
Output: 2
```

### Constraints

- `2 <= values.length <= 5 * 10^4`
- `1 <= values[i] <= 1000`

## Hints

### Hint 1

Can you tell the best sightseeing spot in one pass (i.e. as you iterate over the input)? What should we store or keep track of as we iterate to do this?

### Hint 2

Split the score into (values[i] + i) + (values[j] - j); for each j, pair it with the maximum values[i] + i seen so far.

### Hint 3

A single running maximum of values[i] + i is enough — no need for the full O(n^2) double loop.
