# Count the Number of Good Partitions

## Description

You are given a 0-indexed array nums consisting of positive integers.

A partition of an array into one or more contiguous subarrays is called
good if no two subarrays contain the same number.

Return the total number of good partitions of nums.

Since the answer may be large, return it modulo 10⁹ + 7.

### Example 1

```text
Input: nums = [1,2,3,4]
Output: 8
Explanation: The 8 possible good partitions are: ([1], [2], [3], [4]),
([1], [2], [3,4]), ([1], [2,3], [4]), ([1], [2,3,4]), ([1,2], [3], [4]),
([1,2], [3,4]), ([1,2,3], [4]), and ([1,2,3,4]).
```

### Example 2

```text
Input: nums = [1,1,1,1]
Output: 1
Explanation: The only possible good partition is: ([1,1,1,1]).
```

### Example 3

```text
Input: nums = [1,2,1,3]
Output: 2
Explanation: The 2 possible good partitions are: ([1,2,1], [3]) and
([1,2,1,3]).
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`

## Hints

### Hint 1

If a segment contains a value, it must contain all occurrences of the same
value.

### Hint 2

Partition the array into segments making each one as short as possible.
This can be achieved by two-pointers or using a Set.

### Hint 3

If we have m segments, we can arbitrarily group the neighboring segments.
How many ways are there to group these m segments?
