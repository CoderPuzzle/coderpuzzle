# Longest Consecutive Sequence

## Description

Given an unsorted array of integers `nums`, return the length of the
longest consecutive elements sequence.

You must write an algorithm that runs in `O(n)` time.

### Example 1

```text
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
```

### Example 2

```text
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
```

### Example 3

```text
Input: nums = [1,0,1,2]
Output: 3
```

### Constraints

- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## Hints

### Hint 1

Only a number whose left neighbor x - 1 is absent from the input can be the start of a consecutive sequence.

### Hint 2

Put all numbers in a hash set, then walk upward from each sequence start to measure its length.

### Hint 3

Since the walk starts only at true sequence starts, every element is visited at most twice overall, keeping the algorithm O(n).
