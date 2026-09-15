# Partition Array Into Three Parts With Equal Sum

## Description

Given an array of integers arr, return true if we can partition the
array into three non-empty parts with equal sums.

Formally, we can partition the array if we can find indexes i + 1 < j
with (arr[0] + arr[1] + ... + arr[i] == arr[i + 1] + arr[i + 2] + ... +
arr[j - 1] == arr[j] + arr[j + 1] + ... + arr[arr.length - 1])

### Example 1

```text
Input: arr = [0,2,1,-6,6,-7,9,1,2,0,1]
Output: true
Explanation: 0 + 2 + 1 = -6 + 6 - 7 + 9 + 1 = 2 + 0 + 1
```

### Example 2

```text
Input: arr = [0,2,1,-6,6,7,9,-1,2,0,1]
Output: false
```

### Example 3

```text
Input: arr = [3,3,6,5,-2,2,5,1,-9,4]
Output: true
Explanation: 3 + 3 = 6 = 5 - 2 + 2 + 5 + 1 - 9 + 4
```

### Constraints

- `3 <= arr.length <= 5 * 10^4`
- `-10^4 <= arr[i] <= 10^4`

## Hints

### Hint 1

If we have three parts with the same sum, what is the sum of each? If
you can find the first part, can you find the second part?
