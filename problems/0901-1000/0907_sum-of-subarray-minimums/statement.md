# Sum of Subarray Minimums

## Description

Given an array of integers `arr`, find the sum of `min(b)`, where `b` ranges
over every (contiguous) subarray of `arr`. Since the answer may be large,
return the answer modulo `10^9 + 7`.

### Example 1

```text
Input: arr = [3,1,2,4]
Output: 17
Explanation:
Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4].
Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
Sum is 17.
```

### Example 2

```text
Input: arr = [11,81,94,43,3]
Output: 444
```

### Constraints

- `1 <= arr.length <= 3 * 10^4`
- `1 <= arr[i] <= 3 * 10^4`

## Hints

### Hint 1

For each element, count the subarrays in which it is the minimum instead of enumerating subarrays one by one.

### Hint 2

Use a monotonic stack to find, for every index, the distance to the previous strictly smaller element and to the next smaller-or-equal element.

### Hint 3

arr[i] contributes arr[i] * left_distance * right_distance to the total; break ties consistently (strict on one side, non-strict on the other) to avoid double counting equal values.

### Hint 4

Return the accumulated sum modulo 10^9 + 7.
