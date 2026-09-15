# Find Subarray With Bitwise OR Closest to K

## Description

You are given an array `nums` and an integer `k`. You need to find a subarray of `nums` such that the absolute difference between `k` and the bitwise OR of the subarray elements is as small as possible. In other words, select a subarray `nums[l..r]` such that `|k - (nums[l] OR nums[l + 1] ... OR nums[r])|` is minimum.

Return the minimum possible value of the absolute difference.

A subarray is a contiguous non-empty sequence of elements within an array.

### Example 1

```text
Input: nums = [1,2,4,5], k = 3
Output: 0
Explanation: The subarray nums[0..1] has OR value 3, which gives the minimum absolute difference |3 - 3| = 0.
```

### Example 2

```text
Input: nums = [1,3,1,3], k = 2
Output: 1
Explanation: The subarray nums[1..1] has OR value 3, which gives the minimum absolute difference |3 - 2| = 1.
```

### Example 3

```text
Input: nums = [1], k = 10
Output: 9
Explanation: There is a single subarray with OR value 1, which gives the minimum absolute difference |10 - 1| = 9.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `1 <= k <= 10⁹`

## Hints

### Hint 1

Let dp[i] be the set of all the bitwise ORs of all subarrays ending at index i.

### Hint 2

Start from nums[i], taking the bitwise OR result by including elements one by one towards the left. Notice that only unset bits can become set when adding an element, and set bits never become unset again.

### Hint 3

Hence dp[i] can contain at most 30 elements.
