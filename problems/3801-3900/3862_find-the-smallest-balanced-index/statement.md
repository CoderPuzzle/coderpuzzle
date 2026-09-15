# Find the Smallest Balanced Index

## Description

You are given an integer array nums.

An index i is balanced if the sum of elements strictly to the left of i
equals the product of elements strictly to the right of i.

If there are no elements to the left, the sum is considered as 0. Similarly,
if there are no elements to the right, the product is considered as 1.

Return an integer denoting the smallest balanced index. If no balanced index
exists, return -1.

### Example 1

```text
Input: nums = [2,1,2]
Output: 1
Explanation:
For index i = 1:
  Left sum = nums[0] = 2
  Right product = nums[2] = 2
  Since the left sum equals the right product, index 1 is balanced.

No smaller index satisfies the condition, so the answer is 1.
```

### Example 2

```text
Input: nums = [2,8,2,2,5]
Output: 2
Explanation:
For index i = 2:
  Left sum = 2 + 8 = 10
  Right product = 2 * 5 = 10
  Since the left sum equals the right product, index 2 is balanced.

No smaller index satisfies the condition, so the answer is 2.
```

### Example 3

```text
Input: nums = [1]
Output: -1
Explanation:
For index i = 0:
  The left side is empty, so the left sum is 0.
  The right side is empty, so the right product is 1.
  Since the left sum does not equal the right product, index 0 is not balanced.

Therefore, no balanced index exists and the answer is -1.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`

## Hints

### Hint 1

Compute prefix sums for elements to the left of each index.

### Hint 2

Compute suffix products for elements to the right with overflow checks.

### Hint 3

Check each index i where left sum == right product.

### Hint 4

Return the smallest such index, or -1 if none exists.
