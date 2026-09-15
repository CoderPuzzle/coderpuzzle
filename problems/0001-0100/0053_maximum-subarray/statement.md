# Maximum Subarray

## Description

Given an integer array `nums`, find the subarray with the largest sum, and
return _its sum_.

### Example 1

```text
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
```

### Example 2

```text
Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
```

### Example 3

```text
Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

**Follow up:** If you have figured out the `O(n)` solution, try coding another
solution using the divide and conquer approach, which is more subtle.

## Hints

### Hint 1

Kadane's algorithm: scan left to right keeping the best subarray sum ending at the current index.

### Hint 2

Either extend the previous running sum by the current element, or start fresh at the current element — take whichever is larger.

### Hint 3

Track the maximum over all positions; initialize with the first element so all-negative arrays work.
