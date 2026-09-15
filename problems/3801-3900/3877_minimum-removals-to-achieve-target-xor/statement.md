# Minimum Removals to Achieve Target XOR

## Description

You are given an integer array `nums` and an integer `target`.

You may remove any number of elements from `nums` (possibly zero).

Return the minimum number of removals required so that the bitwise XOR of the
remaining elements equals `target`. If it is impossible to achieve `target`,
return `-1`.

The bitwise XOR of an empty array is `0`.

### Example 1

```text
Input: nums = [1,2,3], target = 2
Output: 1
Explanation:
Removing nums[1] = 2 leaves [nums[0], nums[2]] = [1, 3].
The XOR of [1, 3] is 2, which equals target.
It is not possible to achieve XOR = 2 in less than one removal, therefore the answer is 1.
```

### Example 2

```text
Input: nums = [2,4], target = 1
Output: -1
Explanation:
It is impossible to remove elements to achieve target. Thus, the answer is -1.
```

### Example 3

```text
Input: nums = [7], target = 7
Output: 0
Explanation:
The XOR of all elements is nums[0] = 7, which equals target. Thus, no removal is needed.
```

### Constraints

- `1 <= nums.length <= 40`
- `0 <= nums[i] <= 10^4`
- `0 <= target <= 10^4`

## Hints

### Hint 1

Use meet in the middle or dynamic programming to explore which subset XORs are achievable.

### Hint 2

Keeping a subset whose XOR equals target means the removed subset's XOR is fixed: it must equal the XOR of all elements XORed with target.

### Hint 3

Maximize the number of kept elements whose XOR equals target; the minimum removals is the array length minus that maximum.
