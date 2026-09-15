# Count the Number of Fair Pairs

## Description

Given a 0-indexed integer array `nums` of size n and two integers `lower`
and `upper`, return the number of fair pairs.

A pair `(i, j)` is fair if:

- `0 <= i < j < n`, and
- `lower <= nums[i] + nums[j] <= upper`

### Example 1

```text
Input: nums = [0,1,7,4,4,5], lower = 3, upper = 6
Output: 6
Explanation: There are 6 fair pairs: (0,3), (0,4), (0,5), (1,3), (1,4),
and (1,5).
```

### Example 2

```text
Input: nums = [1,7,9,2,5], lower = 11, upper = 11
Output: 1
Explanation: There is a single fair pair: (2,3).
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `nums.length == n`
- `-10⁹ <= nums[i] <= 10⁹`
- `-10⁹ <= lower <= upper <= 10⁹`

## Hints

### Hint 1

Sort the array in ascending order.

### Hint 2

For each number in the array, keep track of the smallest and largest numbers in the array that can form a fair pair with this number.

### Hint 3

As you move to larger number, both boundaries move down.
