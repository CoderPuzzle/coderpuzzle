# Two Sum

## Description

Given an array of integers `nums` and an integer `target`, return the indices
of the two numbers whose values add up to `target`.

You may assume that every input has **exactly one solution**, and you may not
use the same element twice.

You can return the answer in any order.

### Example 1

```text
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] is 9, so return [0,1].
```

### Example 2

```text
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

### Example 3

```text
Input: nums = [3,3], target = 6
Output: [0,1]
```

### Constraints

- `2 <= nums.length <= 10⁴`
- `-10⁹ <= nums[i] <= 10⁹`
- `-10⁹ <= target <= 10⁹`
- Only one valid answer exists.

### Follow-up

Can you design an algorithm with less than `O(n²)` time complexity?

## Hints

### Hint 1

A brute-force search considers every pair. Use it to identify the repeated work you could avoid.

### Hint 2

For a fixed value x, the number you need is target - x. What structure can locate that complement quickly?

### Hint 3

A hash map can remember values you have already visited and the index where each appeared.
