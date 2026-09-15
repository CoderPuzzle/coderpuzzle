# Delete and Earn

## Description

You are given an integer array `nums`. You want to maximize the number of
points you get by performing the following operation any number of times:

- Pick any `nums[i]` and delete it to earn `nums[i]` points. Afterwards, you
  must delete every element equal to `nums[i] - 1` and every element equal to
  `nums[i] + 1`.

Return the maximum number of points you can earn by applying the above
operation some number of times.

### Example 1

```text
Input: nums = [3,4,2]
Output: 6
Explanation: You can perform the following operations:
- Delete 4 to earn 4 points. Consequently, 3 is also deleted. nums = [2].
- Delete 2 to earn 2 points. nums = [].
You earn a total of 6 points.
```

### Example 2

```text
Input: nums = [2,2,3,3,3,4]
Output: 9
Explanation: You can perform the following operations:
- Delete a 3 to earn 3 points. All 2's and 4's are also deleted. nums = [3,3].
- Delete a 3 again to earn 3 points. nums = [3].
- Delete a 3 once more to earn 3 points. nums = [].
You earn a total of 9 points.
```

### Constraints

- `1 <= nums.length <= 2 * 10^4`
- `1 <= nums[i] <= 10^4`

## Hints

### Hint 1

If you take a value, you might as well take every copy of it: deleting value v earns v * (number of copies of v).

### Hint 2

Count occurrences of each value and run a house-robber style DP over the sorted distinct values.

### Hint 3

Taking value v forbids taking v-1 and v+1, so for each value decide take versus skip based on the best of the previous distinct value.
