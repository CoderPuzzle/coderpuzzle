# Maximum Increasing Triplet Value

## Description

Given an array nums, return the maximum value of a triplet (i, j, k) such
that i < j < k and nums[i] < nums[j] < nums[k].

The value of a triplet (i, j, k) is nums[i] - nums[j] + nums[k].

### Example 1

```text
Input:  nums = [5,6,9]

Output:  8

Explanation:  We only have one choice for an increasing triplet and that is
choosing all three elements. The value of this triplet would be 5 - 6 + 9 = 8.
```

### Example 2

```text
Input:  nums = [1,5,3,6]

Output:  4

Explanation:  There are only two increasing triplets:

(0, 1, 3): The value of this triplet is nums[0] - nums[1] + nums[3] = 1 - 5
+ 6 = 2.

(0, 2, 3): The value of this triplet is nums[0] - nums[2] + nums[3] = 1 - 3
+ 6 = 4.

Thus the answer would be 4.
```

### Constraints

- `3 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- The input is generated such that at least one triplet meets the given
  condition.

## Hints

### Hint 1

For each element, define right[i] as the value of the greatest element with
an index greater than i.

### Hint 2

Start iterating from the beginning, define a set containing the elements seen
so far.

### Hint 3

When you are at index i, use binary search on the set to find the greatest
element on the left of index i that is smaller than nums[i] and name it
greatest_left.

### Hint 4

Also check that nums[i] < right[i].

### Hint 5

If the above conditions hold, then ans = max(ans, greatest_left - nums[i] +
right[i]).
