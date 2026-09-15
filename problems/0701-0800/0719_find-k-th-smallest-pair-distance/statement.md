# Find K-th Smallest Pair Distance

## Description

The distance of a pair of integers `a` and `b` is defined as the absolute
difference between `a` and `b`.

Given an integer array `nums` and an integer `k`, return the `k`th smallest
distance among all the pairs `nums[i]` and `nums[j]` where
`0 <= i < j < nums.length`.

### Example 1

```text
Input: nums = [1,3,1], k = 1
Output: 0
Explanation: Here are all the pairs:
(1,3) -> 2
(1,1) -> 0
(3,1) -> 2
Then the 1st smallest distance pair is (1,1), and its distance is 0.
```

### Example 2

```text
Input: nums = [1,1,1], k = 2
Output: 0
```

### Example 3

```text
Input: nums = [1,6,1], k = 3
Output: 5
```

### Constraints

- `n == nums.length`
- `2 <= n <= 10⁴`
- `0 <= nums[i] <= 10⁶`
- `1 <= k <= n * (n - 1) / 2`

## Hints

### Hint 1

Binary search for the answer. How can you check how many pairs have distance <= X?

### Hint 2

After sorting the array, a two-pointer scan counts the pairs with distance <= X in O(n) time.

### Hint 3

The smallest feasible distance where at least k pairs have distance <= X is the k-th smallest pair distance.
