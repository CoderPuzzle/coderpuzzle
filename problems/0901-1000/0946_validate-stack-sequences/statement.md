# Validate Stack Sequences

## Description

Given two integer arrays `pushed` and `popped` with distinct values, return
`true` if `popped` could have been the result of a sequence of push and pop
operations on an initially empty stack, or `false` otherwise.

Pushes happen only in the order the values appear in `pushed` — each push
places the next not-yet-pushed element on the top of the stack — while a pop
may happen at any time and removes the current top element.

### Example 1

```text
Input: pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
Output: true
Explanation: We might perform the following operations:
push(1), push(2), push(3), push(4), pop() -> 4,
push(5), pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1.
```

### Example 2

```text
Input: pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
Output: false
Explanation: 1 cannot be popped before 2.
```

### Constraints

- `1 <= pushed.length <= 1000`
- `0 <= pushed[i] <= 1000`
- All the elements of `pushed` are unique.
- `popped.length == pushed.length`
- `popped` is a permutation of `pushed`.
