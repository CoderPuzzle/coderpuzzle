# Element Appearing More Than 25% In Sorted Array

## Description

Given an integer array sorted in non-decreasing order, there is exactly
one integer in the array that occurs more than 25% of the time, return
that integer.

### Example 1

```text
Input: arr = [1,2,2,6,6,6,6,7,10]
Output: 6
```

### Example 2

```text
Input: arr = [1,1]
Output: 1
```

### Constraints

- `1 <= arr.length <= 10^4`
- `0 <= arr[i] <= 10^5`

## Hints

### Hint 1

Divide the array in four parts `[1 - 25%]` `[25 - 50%]` `[50 - 75%]`
`[75% - 100%]`.

### Hint 2

The answer should be in one of the ends of the intervals.

### Hint 3

In order to check which is element is the answer we can count the
frequency with binarySearch.
