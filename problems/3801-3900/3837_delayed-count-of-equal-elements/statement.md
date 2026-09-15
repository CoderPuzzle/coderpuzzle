# Delayed Count of Equal Elements

## Description

You are given an integer array `nums` of length `n` and an integer `k`.

For each index `i`, define the delayed count as the number of indices `j`
such that:

- `i + k < j <= n - 1`, and
- `nums[j] == nums[i]`

Return an array `ans` where `ans[i]` is the delayed count of index `i`.

### Example 1

```text
Input: nums = [1,2,1,1], k = 1
Output: [2,0,0,0]
Explanation: The candidates for each index are the j with i + k < j.
i = 0: nums[0] = 1, possible j = [2, 3], nums[j] = [1, 1], satisfying
nums[j] == nums[0] are [2, 3], so ans[0] = 2.
i = 1: nums[1] = 2, possible j = [3], nums[j] = [1], satisfying
nums[j] == nums[1] is [], so ans[1] = 0.
i = 2: possible j = [], so ans[2] = 0.
i = 3: possible j = [], so ans[3] = 0.
Thus, ans = [2, 0, 0, 0].
```

### Example 2

```text
Input: nums = [3,1,3,1], k = 0
Output: [1,1,0,0]
Explanation: The candidates for each index are the j with i + k < j.
i = 0: nums[0] = 3, possible j = [1, 2, 3], nums[j] = [1, 3, 1],
satisfying nums[j] == nums[0] is [2], so ans[0] = 1.
i = 1: nums[1] = 1, possible j = [2, 3], nums[j] = [3, 1], satisfying
nums[j] == nums[1] is [3], so ans[1] = 1.
i = 2: nums[2] = 3, possible j = [3], nums[j] = [1], satisfying
nums[j] == nums[2] is [], so ans[2] = 0.
i = 3: possible j = [], so ans[3] = 0.
Thus, ans = [1, 1, 0, 0].
```

### Constraints

- `1 <= n == nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`
- `0 <= k <= n - 1`

## Hints

### Hint 1

Use a hashmap.

### Hint 2

Traverse from left to right, and at index `i` insert `nums[i + k + 1]` (if
it exists) into the hashmap.

### Hint 3

For the current index `i`, count how many of its occurrences are in the
hashmap and push it into the result.

### Hint 4

Reverse the resulting list and return it.
