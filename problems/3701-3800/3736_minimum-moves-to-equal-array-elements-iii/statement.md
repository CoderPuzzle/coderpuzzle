# Minimum Moves to Equal Array Elements III

## Description

You are given an integer array nums.

In one move you may pick any single element of nums and increase it by one.
Return the minimum total number of moves required so that all elements of
nums become equal.

### Example 1

```text
Input: nums = [2,1,3]
Output: 3
Explanation: Every element must end at a common value, and moves can only
raise elements, so the array settles on its largest value, 3. Increase
nums[0] from 2 to 3, then increase nums[1] from 1 to 2 and once more from
2 to 3. All elements now equal 3 after 1 + 2 = 3 moves, and no sequence of
moves can do better.
```

### Example 2

```text
Input: nums = [4,4,5]
Output: 2
Explanation: The largest value is 5 and it already appears in the array,
so only the two 4s need work: raise each one by one unit. After those two
moves the array is [5,5,5].
```

### Constraints

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

## Hints

### Hint 1

To make all numbers equal, they must all reach at least the maximum value in the array.
