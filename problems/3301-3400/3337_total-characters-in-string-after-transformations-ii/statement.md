# Total Characters in String After Transformations II

## Description

You are given a string `s` consisting of lowercase English letters, an integer `t` representing the number of transformations to perform, and an array `nums` of size `26`. In one transformation, every character in `s` is replaced according to the following rules:

- Replace `s[i]` with the next `nums[s[i] - 'a']` consecutive characters in the alphabet. For example, if `s[i] = 'a'` and `nums[0] = 3`, the character `'a'` transforms into the next 3 consecutive characters ahead of it, which results in `"bcd"`.
- The transformation wraps around the alphabet if it exceeds `'z'`. For example, if `s[i] = 'y'` and `nums[24] = 3`, the character `'y'` transforms into the next 3 consecutive characters ahead of it, which results in `"zab"`.

Return the length of the resulting string after exactly `t` transformations.

Since the answer may be very large, return it modulo `10⁹ + 7`.

### Example 1

```text
Input: s = "abcyy", t = 2, nums = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2]
Output: 7
Explanation: After the first transformation the string becomes "bcdzz". After the second transformation it becomes "cdeabab", which has 7 characters.
```

### Example 2

```text
Input: s = "azbk", t = 1, nums = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
Output: 8
Explanation: After the first transformation the string becomes "bcabcdlm", which has 8 characters.
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists only of lowercase English letters.
- `1 <= t <= 10⁹`
- `nums.length == 26`
- `1 <= nums[i] <= 25`

## Hints

### Hint 1

Model the problem as a matrix multiplication problem.

### Hint 2

Use exponentiation to quickly multiply matrices.
