# Two Sum II - Input Array Is Sorted

## Description

Given a **1-indexed** array of integers `numbers` that is already sorted in
non-decreasing order, find two numbers such that they add up to a specific
`target` number. Let these two numbers be `numbers[index1]` and
`numbers[index2]` where `1 <= index1 < index2 <= numbers.length`.

Return the indices of the two numbers, `index1` and `index2`, each incremented
by one, as an integer array `[index1, index2]` of length 2.

The tests are generated such that there is **exactly one solution**. You may
not use the same element twice.

Your solution must use only constant extra space.

### Example 1

```text
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
```

### Example 2

```text
Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore, index1 = 1, index2 = 3. We return [1, 3].
```

### Example 3

```text
Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].
```

### Constraints

- `2 <= numbers.length <= 3 * 10⁴`
- `-1000 <= numbers[i] <= 1000`
- `numbers` is sorted in non-decreasing order.
- `-1000 <= target <= 1000`
- The tests are generated such that there is exactly one solution.

## Hints

### Hint 1

The array is sorted — two pointers at both ends can move toward each other.

### Hint 2

If the sum of the two pointed-at values is too small, only advancing the left
pointer can increase it; if too large, only retreating the right pointer can
decrease it.

### Hint 3

Because exactly one solution exists, the pointers never skip past an answer:
each step discards one element that provably cannot be part of the pair.
