# Sum of Consecutive Subsequences

## Description

We call an array `arr` of length `n` consecutive if one of the following
holds:

- `arr[i] - arr[i - 1] == 1` for all `1 <= i < n`.
- `arr[i] - arr[i - 1] == -1` for all `1 <= i < n`.

The value of an array is the sum of its elements.

For example, `[3, 4, 5]` is a consecutive array of value 12 and `[9, 8]`
is another of value 17. While `[3, 4, 3]` and `[8, 6]` are not
consecutive.

Given an array of integers `nums`, return the sum of the values of all
consecutive non-empty subsequences.

Since the answer may be very large, return it modulo `10⁹ + 7`.

Note that an array of length 1 is also considered consecutive.

### Example 1

```text
Input: nums = [1,2]
Output: 6
Explanation: The consecutive subsequences are: [1], [2], [1, 2].
```

### Example 2

```text
Input: nums = [1,4,2,3]
Output: 31
Explanation: The consecutive subsequences are: [1], [4], [2], [3],
[1, 2], [2, 3], [4, 3], [1, 2, 3].
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`

## Hints

### Hint 1

Try to count the number of times each element occurred in a consecutive
subsequence, then you can find the answer easily.

### Hint 2

Think of dynamic programming as a solution to calculate the number in the
previous hint.

### Hint 3

Let left_inc[i] be the number of increasing consecutive subsequences
ending at nums[i] (except for nums[i] itself).

### Hint 4

Let right_inc[i] be the number of increasing consecutive subsequences
starting at nums[i] (except for nums[i] itself).

### Hint 5

Then nums[i] is in left_inc[i] + right_inc[i] + left_inc[i] *
right_inc[i] + 1 increasing subsequences.

### Hint 6

Do the same for decreasing consecutive subsequences.
