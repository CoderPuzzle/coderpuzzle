# Find the Kth Largest Integer in the Array

## Description

You are given an array of strings `nums` and an integer `k`. Each string
in `nums` represents an integer without leading zeros.

Return the string that represents the `k`th largest integer in `nums`.

Note: Duplicate numbers should be counted distinctly. For example, if
`nums` is `["1","2","2"]`, `"2"` is the first largest integer, `"2"` is
the second-largest integer, and `"1"` is the third-largest integer.

### Example 1

```text
Input: nums = ["3","6","7","10"], k = 4
Output: "3"
Explanation:
The numbers in nums sorted in non-decreasing order are ["3","6","7","10"].
The 4th largest integer in nums is "3".
```

### Example 2

```text
Input: nums = ["2","21","12","1"], k = 3
Output: "2"
Explanation:
The numbers in nums sorted in non-decreasing order are ["1","2","12","21"].
The 3rd largest integer in nums is "2".
```

### Example 3

```text
Input: nums = ["0","0"], k = 2
Output: "0"
Explanation:
The numbers in nums sorted in non-decreasing order are ["0","0"].
The 2nd largest integer in nums is "0".
```

### Constraints

- `1 <= k <= nums.length <= 10⁴`
- `1 <= nums[i].length <= 100`
- `nums[i]` consists of only digits.
- `nums[i]` will not have any leading zeros.

## Hints

### Hint 1

If two numbers have different lengths, which one will be larger?

### Hint 2

The longer number is the larger number.

### Hint 3

If two numbers have the same length, which one will be larger?

### Hint 4

Compare the two numbers starting from the most significant digit. Once you
have found the first digit that differs, the one with the larger digit is
the larger number.
