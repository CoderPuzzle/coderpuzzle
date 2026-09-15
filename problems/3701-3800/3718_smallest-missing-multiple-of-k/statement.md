# Smallest Missing Multiple of K

## Description

You are given an integer array nums and an integer k.

Return the smallest positive multiple of k that is missing from nums. The
multiples of k considered here are the positive integers divisible by k,
starting at k itself: k, 2k, 3k, and so on. Values in nums that are not
multiples of k never matter — they can neither supply a candidate nor
block one.

### Example 1

```text
Input: nums = [8,2,3,4,6], k = 2
Output: 10
Explanation: The multiples of k = 2 are 2, 4, 6, 8, 10, 12, ... and nums
already contains 2, 4, 6, and 8, so the smallest one it lacks is 10.
```

### Example 2

```text
Input: nums = [1,4,7,10,15], k = 5
Output: 5
Explanation: The multiples of k = 5 are 5, 10, 15, 20, ... and although
10 and 15 are present, the very first multiple, 5, is not.
```

### Constraints

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`
- `1 <= k <= 100`

## Hints

### Hint 1

Add the values in nums to a hash set.

### Hint 2

Iterate through the positive multiples of k and return the first one not in the set.
