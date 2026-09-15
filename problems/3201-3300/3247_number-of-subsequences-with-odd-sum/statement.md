# Number of Subsequences with Odd Sum

## Description

You are given an integer array `nums`.

Return the number of subsequences of `nums` whose sum of elements is odd.
Since the answer can be very large, return it modulo `10⁹ + 7`.

### Example 1

```text
Input: nums = [1,1,1]
Output: 4
Explanation: Every element is odd, so a subsequence has an odd sum
exactly when it contains an odd number of elements. Those are the three
one-element subsequences, at positions [0], [1], and [2], plus the full
array itself: 3 + 1 = 4.
```

### Example 2

```text
Input: nums = [1,2,2]
Output: 4
Explanation: A subsequence has an odd sum exactly when it contains the
element 1, since adding either copy of 2 never changes a sum's parity.
The 1 can be accompanied by neither, the first, the second, or both
copies of 2, giving 2 * 2 = 4 subsequences.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`

## Hints

### Hint 1

Define dp[i][0] as the answer for the subarray [0, i].

### Hint 2

Similarly define dp[i][1] as the answer for the subarray [0, i] if we
wanted to count even-sum subsequences.

### Hint 3

If nums[i] is odd, dp[i][x] = 2ⁱ.

### Hint 4

Otherwise, dp[i][x] = dp[i - 1][x] * 2.

### Hint 5

dp[0][1] = 1 if nums[0] is odd, and 0 otherwise.

### Hint 6

dp[0][0] = 2 if nums[0] is even, and 1 otherwise (since an empty
subsequence has an even sum).
