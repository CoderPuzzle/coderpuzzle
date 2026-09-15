# Russian Doll Envelopes

## Description

You are given a 2D array of integers `envelopes` where
`envelopes[i] = [wi, hi]` represents the width and height of an envelope.

One envelope can fit into another if and only if both the width and height of
one envelope are greater than the other envelope's width and height.

Return the maximum number of envelopes you can Russian doll (i.e., put one
inside the other).

Note: You cannot rotate an envelope.

### Example 1

```text
Input: envelopes = [[5,4],[6,4],[6,7],[2,3]]
Output: 3
Explanation: The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]).
```

### Example 2

```text
Input: envelopes = [[1,1],[1,1],[1,1]]
Output: 1
```

### Constraints

- `1 <= envelopes.length <= 10^5`
- `envelopes[i].length == 2`
- `1 <= wi, hi <= 10^5`

## Hints

### Hint 1

Sort the envelopes by width ascending, breaking ties by height descending.

### Hint 2

With that ordering, the answer is the length of the longest strictly increasing subsequence of heights.

### Hint 3

Sorting equal-width envelopes by descending height stops same-width envelopes from chaining into each other.

### Hint 4

Use patience sorting with binary search on the heights to get O(n log n).
