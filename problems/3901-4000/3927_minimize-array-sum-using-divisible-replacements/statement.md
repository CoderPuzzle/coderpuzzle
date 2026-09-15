# Minimize Array Sum Using Divisible Replacements

## Description

You are given an integer array `nums`.

You can perform the following operation any number of times:

- Choose two indices `a` and `b` such that `nums[a] % nums[b] == 0`.
- Replace `nums[a]` with `nums[b]`.

Return the minimum possible sum of the array after performing any number of
operations.

### Example 1

```text
Input: nums = [3,6,2]
Output: 7
Explanation:
    Choose a = 1, b = 2, where nums[a] = 6 and nums[b] = 2. Since 6 % 2 == 0,
    replace nums[1] with nums[2].
    The array becomes [3, 2, 2].
    No further operation reduces the sum. Thus, the final sum is 3 + 2 + 2 = 7.
```

### Example 2

```text
Input: nums = [4,2,8,3]
Output: 9
Explanation:
    Choose a = 0, b = 1, where nums[a] = 4 and nums[b] = 2. Since 4 % 2 == 0,
    replace nums[0] with nums[1].
    Choose a = 2, b = 1, where nums[a] = 8 and nums[b] = 2. Since 8 % 2 == 0,
    replace nums[2] with nums[1].
    The array becomes [2, 2, 2, 3].
    No further operation reduces the sum. Thus, the final sum is
    2 + 2 + 2 + 3 = 9.
```

### Example 3

```text
Input: nums = [7,5,9]
Output: 21
Explanation:
    There is no pair (a, b) such that nums[a] % nums[b] == 0.
    Hence, no operation can be performed. The sum remains 7 + 5 + 9 = 21.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`

## Hints

### Hint 1

Each value can be replaced by a smaller value already present that divides it.
