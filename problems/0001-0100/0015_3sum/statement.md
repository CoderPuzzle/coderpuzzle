# 3Sum

## Description

Given an integer array `nums`, return all the triplets
`[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and
`nums[i] + nums[j] + nums[k] == 0`.

Notice that the solution set must not contain duplicate triplets.

For a deterministic answer, return each triplet with its elements in
ascending order, and the list of triplets itself sorted in ascending
lexicographic order.

### Example 1

```text
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,-1,2] and [-1,0,1].
```

### Example 2

```text
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
```

### Example 3

```text
Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
```

### Constraints

- `3 <= nums.length <= 3000`
- `-10^5 <= nums[i] <= 10^5`

## Hints

### Hint 1

We need three numbers x, y, z that add up to 0. If we fix one of the numbers, say x, we are left with the two-sum problem.

### Hint 2

Sort the array first: then for each fixed x a two-pointer scan finds the remaining pair in linear time.

### Hint 3

Skip duplicated values at both the fixed index and the two pointers so the result contains no duplicate triplets.
