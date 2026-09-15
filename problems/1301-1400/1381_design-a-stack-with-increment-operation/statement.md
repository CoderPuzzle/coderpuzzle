# Design a Stack With Increment Operation

## Description

Design a stack that supports increment operations on its elements.

Implement the `CustomStack` class:

- `CustomStack(int maxSize)` Initializes the object with `maxSize`, the maximum
  number of elements the stack can hold.
- `void push(int x)` Adds `x` to the top of the stack if the stack has not
  reached `maxSize`.
- `int pop()` Pops and returns the top of the stack, or `-1` if the stack is
  empty.
- `void increment(int k, int val)` Increments the bottom `k` elements of the
  stack by `val`. If there are fewer than `k` elements in the stack, increment
  all of them.

### Example 1

```text
Input:
["CustomStack", "push", "push", "pop", "push", "push", "push", "increment", "increment", "pop", "pop", "pop", "pop"]
[[3], [1], [2], [], [2], [3], [4], [5, 100], [2, 100], [], [], [], []]
Output: [null, null, null, 2, null, null, null, null, null, 103, 202, 201, -1]
Explanation:
CustomStack stk = new CustomStack(3); // stack is empty []
stk.push(1);        // stack becomes [1]
stk.push(2);        // stack becomes [1, 2]
stk.pop();          // return 2, stack becomes [1]
stk.push(2);        // stack becomes [1, 2]
stk.push(3);        // stack becomes [1, 2, 3]
stk.push(4);        // stack still [1, 2, 3] — maxSize is 3
stk.increment(5, 100); // stack becomes [101, 102, 103]
stk.increment(2, 100); // stack becomes [201, 202, 103]
stk.pop();          // return 103, stack becomes [201, 202]
stk.pop();          // return 202, stack becomes [201]
stk.pop();          // return 201, stack becomes []
stk.pop();          // return -1 — the stack is empty
```

### Constraints

- `1 <= maxSize, x, k <= 1000`
- `0 <= val <= 100`
- At most `1000` calls will be made to `push`, `pop`, and `increment` each,
  separately.

### Follow-up

Can you implement `push`, `pop`, and `increment` so that no operation ever
rewrites more than a constant number of slots, even when `k` equals the stack
size?

## Hints

### Hint 1

An array with a size counter gives `push` and `pop` in constant time. The only
expensive operation is `increment`, whose natural implementation walks the
bottom `k` slots — and `k` can be as large as the whole stack.

### Hint 2

Think about _deferring_ the work instead of doing it eagerly. If a stack of
depth `d` receives `increment(k, val)`, exactly the elements at depths
`1..min(k, d)` deserve `val` more. Store one pending add per depth, applied
when an element is finally popped.

### Hint 3

When popping depth `d`, its pending add must also cover every element that
_used to sit below it_ — those increments were absorbed into the slot. So pop
returns `value[d] + pending[d]`, and before discarding the slot, fold
`pending[d]` into `pending[d - 1]`.
