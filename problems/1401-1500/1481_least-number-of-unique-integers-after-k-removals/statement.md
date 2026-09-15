# Least Number of Unique Integers after K Removals

## Description

Given an array of integers `arr` and an integer `k`, find the least number
of unique integers after removing exactly `k` elements.

### Example 1

```text
Input: arr = [5,5,4], k = 1
Output: 1
Explanation: Remove the single 4; only 5 is left.
```

### Example 2

```text
Input: arr = [4,3,1,1,3,3,2], k = 3
Output: 2
Explanation: Remove 4, 2 and either one of the two 1s or three 3s. The
values 1 and 3 will be left.
```

### Constraints

- `1 <= arr.length <= 10⁵`
- `1 <= arr[i] <= 10⁹`
- `0 <= k <= arr.length`

## Hints

### Hint 1

Use a map to count the frequencies of the numbers in the array.

### Hint 2

An optimal strategy is to remove the numbers with the smallest count
first.
