# First Missing Positive

## Description

Given an unsorted integer array `nums`, return the smallest positive integer
that is not present in `nums`.

You must implement an algorithm that runs in `O(n)` time and uses `O(1)`
auxiliary space.

### Example 1

```text
Input: nums = [1,2,0]
Output: 3
Explanation: The numbers in the range [1,2] are all in the array.
```

### Example 2

```text
Input: nums = [3,4,-1,1]
Output: 2
Explanation: 1 is in the array but 2 is missing.
```

### Example 3

```text
Input: nums = [7,8,9,11,12]
Output: 1
Explanation: The smallest positive integer 1 is missing.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `-2³¹ <= nums[i] <= 2³¹ - 1`

## Hints

### Hint 1

Think about how you would solve the problem with non-constant space (a presence array over the indices); can you apply that logic using the array itself?

### Hint 2

Duplicates and non-positive integers do not matter — ignore them.

### Hint 3

Remember that O(2n) = O(n): a couple of passes over the array is still linear time.
