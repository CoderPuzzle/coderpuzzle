# Number of Effective Subsequences

## Description

You are given an array of positive integers `nums`.

The strength of the array is the bitwise OR of all its elements. The
bitwise OR of an empty array is 0.

A subsequence of `nums` is effective if removing that subsequence strictly
decreases the strength of the remaining elements — that is, the bitwise OR
of everything left after the removal is strictly smaller than the strength
of the whole array.

Return the number of effective subsequences of `nums`. Since the answer may
be very large, return it modulo `10⁹ + 7`. Two subsequences that remove the
same values at different positions count separately.

### Example 1

```text
Input: nums = [1,2,3]
Output: 3
Explanation: The strength of the array is 1 OR 2 OR 3 = 3. The effective
subsequences are [1,3] (leaving [2] with OR 2), [2,3] (leaving [1] with
OR 1), and [1,2,3] (leaving [] with OR 0). Removing [1] alone leaves OR 3,
which does not strictly decrease, so it does not count.
```

### Example 2

```text
Input: nums = [7,4,6]
Output: 4
Explanation: The strength is 7. The effective subsequences are [7]
(leaving OR 6), [7,4] (leaving OR 6), [7,6] (leaving OR 4), and [7,4,6]
(leaving OR 0). Removing [4] or [6] alone leaves strength 7.
```

### Example 3

```text
Input: nums = [8,8]
Output: 1
Explanation: The strength is 8, and only removing both copies kills bit 3,
so only [8,8] (leaving [] with OR 0) is effective.
```

### Example 4

```text
Input: nums = [2,2,1]
Output: 5
Explanation: The strength is 3. The effective subsequences are [1]
(leaving OR 2), [2,1] using nums[0] and nums[2] (leaving OR 2), [2,1] using
nums[1] and nums[2] (leaving OR 2), [2,2] (leaving OR 1), and [2,2,1]
(leaving OR 0).
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁶`

## Hints

### Hint 1

The remaining OR drops exactly when some set bit of the total disappears
from it entirely.

### Hint 2

To eliminate one bit of the total, a removal must take away every element
carrying that bit — so each element carrying the bit is forced into the
removed subsequence.

### Hint 3

Count, for every non-empty set S of the total's bits, the subsequences that
remove all occurrences of every bit in S; inclusion-exclusion over S turns
those counts into the number of subsequences killing at least one bit.
