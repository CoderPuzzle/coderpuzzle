# Minimum Operations to Make Binary Palindrome

## Description

You are given an integer array `nums`.

For each element `nums[i]` you may perform the following operations any
number of times, including zero:

- increase `nums[i]` by `1`, or
- decrease `nums[i]` by `1`.

A number is a binary palindrome if its binary representation without
leading zeros reads the same forward and backward.

Return an integer array `ans`, where `ans[i]` is the minimum number of
operations needed to turn `nums[i]` into a binary palindrome.

### Example 1

```text
Input: nums = [1,2,4]
Output: [0,1,1]
Explanation: 1 is "1", already a palindrome, so it needs 0 operations.
2 is "10"; increasing it once gives 3 = "11", a palindrome. 4 is "100";
decreasing it once gives 3 = "11". One operation each, so ans = [0,1,1].
```

### Example 2

```text
Input: nums = [6,7,12]
Output: [1,0,3]
Explanation: 6 is "110"; decreasing it once gives 5 = "101". 7 is "111",
already a palindrome. 12 is "1100"; the nearest palindromes are 9 = "1001"
below and 15 = "1111" above, each 3 steps away, so 3 operations suffice:
ans = [1,0,3].
```

### Constraints

- `1 <= nums.length <= 5000`
- `1 <= nums[i] <= 5000`

## Hints

### Hint 1

Every binary palindrome is built by choosing its first half of bits and
mirroring that half around the middle — so there are very few of them in
any small range.

### Hint 2

For a fixed value, the answer comes from the closest palindrome below and
the closest one above; only those two neighbors can win.
