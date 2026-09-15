# Maximum Equal Frequency

## Description

Given an array `nums` of positive integers, return the longest possible
length of an array prefix of `nums`, such that it is possible to remove
exactly one element from this prefix so that every number that has appeared
in it will have the same number of occurrences.

If after removing one element there are no remaining elements, it's still
considered that every appeared number has the same number of occurrences (0).

### Example 1

```text
Input: nums = [2,2,1,1,5,3,3,5]
Output: 7
Explanation: For the subarray [2,2,1,1,5,3,3] of length 7, if we remove nums[4] = 5, we will get [2,2,1,1,3,3], so that each number will appear exactly twice.
```

### Example 2

```text
Input: nums = [1,1,1,2,2,2,3,3,3,4,4,4,5]
Output: 13
```

### Constraints

- `2 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`

## Hints

### Hint 1

Keep track of the min and max frequencies.

### Hint 2

The number to be eliminated must have a frequency of 1, same as the others or
the same +1.
