# Count of Smaller Numbers After Self

## Description

Given an integer array `nums`, return an integer array `counts` where
`counts[i]` is the number of smaller elements to the right of `nums[i]`.

### Example 1

```text
Input: nums = [5,2,6,1]
Output: [2,1,1,0]
Explanation:
To the right of 5 there are 2 smaller elements (2 and 1).
To the right of 2 there is only 1 smaller element (1).
To the right of 6 there is 1 smaller element (1).
To the right of 1 there is 0 smaller element.
```

### Example 2

```text
Input: nums = [-1]
Output: [0]
```

### Example 3

```text
Input: nums = [-1,-1]
Output: [0,0]
```

### Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## Hints

### Hint 1

Scan the array from right to left: for each element, the answer is the number of already-seen elements that are strictly smaller than it.

### Hint 2

Because the values lie in the bounded range [-10^4, 10^4], a Fenwick tree (binary indexed tree) over the shifted value range can answer that smaller-count query in O(log n).

### Hint 3

After each query, insert the current element into the structure so the next element to its left can count it.
