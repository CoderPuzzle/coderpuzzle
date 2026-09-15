# Number of Visible People in a Queue

## Description

There are `n` people standing in a queue, and they are numbered from `0` to
`n - 1` in left to right order. You are given an array `heights` of distinct
integers where `heights[i]` represents the height of the `i`th person.

A person can see another person to their right in the queue if everybody in
between is shorter than both of them. More formally, the `i`th person can see
the `j`th person if `i < j` and
`min(heights[i], heights[j]) > max(heights[i+1], heights[i+2], ..., heights[j-1])`.

Return an array `answer` of length `n` where `answer[i]` is the number of
people the `i`th person can see to their right in the queue.

### Example 1

```text
Input: heights = [10,6,8,5,11,9]
Output: [3,1,2,1,1,0]
Explanation:
Person 0 can see person 1, 2, and 4.
Person 1 can see person 2.
Person 2 can see person 3 and 4.
Person 3 can see person 4.
Person 4 can see person 5.
Person 5 can see no one since nobody is to the right of them.
```

![Queue of six people with heights 10, 6, 8, 5, 11, and 9](figures/example-1.svg)

### Example 2

```text
Input: heights = [5,1,2,3,10]
Output: [4,1,1,1,0]
```

### Constraints

- `n == heights.length`
- `1 <= n <= 10^5`
- `1 <= heights[i] <= 10^5`
- All the values of `heights` are unique.

## Hints

### Hint 1

A brute-force scan to the right of every person is quadratic, which is too slow for n up to 10^5; you need a linear solution.

### Hint 2

Iterate the array from the end to the start, keeping a stack of heights of the people to the right, sorted in increasing order from top to bottom.

### Hint 3

For person i, pop everyone shorter than heights[i] — those are exactly the people person i can see — and if the stack is still non-empty, person i can also see that one taller person.

### Hint 4

Push heights[i] afterwards so people further left can count person i.
