# Longest Common Subsequence Between Sorted Arrays

## Description

Given an array of integer arrays `arrays` where each `arrays[i]` is sorted
in strictly increasing order, return an integer array representing the
longest common subsequence among all the arrays.

A subsequence is a sequence that can be derived from another sequence by
deleting some elements (possibly none) without changing the order of the
remaining elements.

### Example 1

```text
Input: arrays = [[1,3,4],
                 [1,4,7,9]]
Output: [1,4]
Explanation: The longest common subsequence in the two arrays is [1,4].
```

### Example 2

```text
Input: arrays = [[2,3,6,8],
                 [1,2,3,5,6,7,10],
                 [2,3,4,6,9]]
Output: [2,3,6]
Explanation: The longest common subsequence in all three arrays is [2,3,6].
```

### Example 3

```text
Input: arrays = [[1,2,3,4,5],
                 [6,7,8]]
Output: []
Explanation: There is no common subsequence between the two arrays.
```

### Constraints

- `2 <= arrays.length <= 100`
- `1 <= arrays[i].length <= 100`
- `1 <= arrays[i][j] <= 100`
- `arrays[i]` is sorted in strictly increasing order.

## Hints

### Hint 1

Fix one array.

### Hint 2

Choose the next array and get the common elements.

### Hint 3

Use the common elements as the new fixed array and keep merging with the
rest of the arrays.
