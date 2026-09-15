# Maximum Product Subarray

## Description

Given an integer array `nums`, find a subarray that has the largest product,
and return the product.

The test cases are generated so that the answer will fit in a 32-bit integer.

Note that the product of an array with a single element is the value of that
element.

### Example 1

```text
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
```

### Example 2

```text
Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
```

### Constraints

- `1 <= nums.length <= 2 * 10^4`
- `-10 <= nums[i] <= 10`
- The product of any subarray of `nums` is guaranteed to fit in a 32-bit
  integer.

## Hints

### Hint 1

Track both the maximum and the minimum product ending at each index: multiplying a negative number by the current minimum can create a new maximum.

### Hint 2

A zero resets the running chain; keep it as a candidate answer but let the chain restart after it.

### Hint 3

One pass keeping cur_max/cur_min per position gives O(n) time and O(1) space.
