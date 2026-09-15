# Target Sum

## Description

You are given an integer array `nums` and an integer `target`.

You want to build an expression out of `nums` by adding one of the symbols
`'+'` and `'-'` before each integer in `nums` and then concatenate all the
integers.

For example, if `nums = [2, 1]`, you can add a `'+'` before `2` and a `'-'`
before `1` and concatenate them to build the expression `"+2-1"`.

Return the number of different expressions that you can build, which evaluates
to `target`.

### Example 1

```text
Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be
target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
```

### Example 2

```text
Input: nums = [1], target = 1
Output: 1
```

### Constraints

- `1 <= nums.length <= 20`
- `0 <= nums[i] <= 1000`
- `0 <= sum(nums[i]) <= 1000`
- `-1000 <= target <= 1000`

## Hints

### Hint 1

Process the numbers one at a time, keeping every reachable running sum and how many assignments reach it.

### Hint 2

A hash map {sum: count} can be propagated element by element: each entry branches into sum + nums[i] and sum - nums[i].

### Hint 3

Brute force over all 2^n sign assignments also passes with n <= 20, but the counting DP is much faster.

### Hint 4

Zeros double the count of every reachable sum, since +0 and -0 are distinct expressions.
