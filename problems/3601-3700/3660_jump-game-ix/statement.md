# Jump Game IX

## Description

You are given an integer array `nums`.

From any index `i` you may jump to another index `j`, but only under these
rules:

- A jump to `j > i` is allowed only when `nums[j] < nums[i]`.
- A jump to `j < i` is allowed only when `nums[j] > nums[i]`.

Starting at an index and taking any sequence of valid jumps reaches some set
of values. Return an integer array `ans` where `ans[i]` is the largest value
reachable through any such sequence of jumps starting from index `i`.

### Example 1

```text
Input: nums = [2,1,3]
Output: [2,2,3]
Explanation:
- i = 0: no jump leads to a value larger than 2.
- i = 1: jump backward to j = 0 because nums[0] = 2 is greater than
  nums[1] = 1.
- i = 2: nums[2] = 3 is already the maximum value in nums.
```

### Example 2

```text
Input: nums = [2,3,1]
Output: [3,3,3]
Explanation:
- i = 0: jump forward to j = 2 because nums[2] = 1 is less than
  nums[0] = 2, then backward to j = 1 because nums[1] = 3 is greater than
  nums[2].
- i = 1: nums[1] = 3 is already the maximum value in nums.
- i = 2: jump backward to j = 1 because nums[1] = 3 is greater than
  nums[2] = 1.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

## Hints

### Hint 1

Think of the array as a directed graph whose edges are the allowed jumps.

### Hint 2

From an index, forward jumps go only to smaller values and backward jumps go
only to larger values.

### Hint 3

The answer for an index is the largest value inside its group of mutually
reachable indices under the jump rules.

### Hint 4

Find those groups by comparing prefix maximums with suffix minimums: a cut
sits wherever every value to its left is `<=` every value to its right, and
each group is one range between consecutive cuts.
