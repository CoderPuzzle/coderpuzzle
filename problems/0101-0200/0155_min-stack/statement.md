# Min Stack

## Description

Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum
element in constant time.

Implement the `MinStack` class:

- `MinStack()` Initializes the stack object.
- `void push(int value)` Pushes the element `value` onto the stack.
- `void pop()` Removes the element on the top of the stack.
- `int top()` Gets the top element of the stack.
- `int getMin()` Retrieves the minimum element in the stack.

Each of the four operations must run in `O(1)` time.

### Example 1

```text
Input:
["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"]
[[], [-2], [0], [-3], [], [], [], []]
Output: [null, null, null, null, -3, null, 0, -2]
Explanation:
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

### Example 2

```text
Input:
["MinStack", "push", "push", "getMin", "pop", "getMin", "push", "getMin", "top"]
[[], [5], [5], [], [], [], [-1], [], []]
Output: [null, null, null, 5, null, 5, null, -1, -1]
Explanation:
MinStack minStack = new MinStack();
minStack.push(5);
minStack.push(5);  // duplicate of the current minimum
minStack.getMin(); // return 5
minStack.pop();
minStack.getMin(); // still 5 — the other copy remains
minStack.push(-1);
minStack.getMin(); // return -1
minStack.top();    // return -1
```

### Constraints

- `-2³¹ <= value <= 2³¹ - 1`
- `pop`, `top`, and `getMin` are always called on non-empty stacks.
- At most `3 * 10⁴` calls will be made to `push`, `pop`, `top`, and `getMin`.

## Hints

### Hint 1

Scanning the stack for the minimum on demand costs `O(n)` per `getMin`, and
recomputing a cached minimum on every `pop` can cost just as much. The minimum
needs to be readable off the stack's state directly.

### Hint 2

Pair each pushed value with the minimum of the stack **as of that moment**:
when `value` arrives, the new running minimum is `min(value, previous
running minimum)` (or `value` alone when the stack was empty). The pair sits
on top of the stack, so `top` and `getMin` each read one field.

### Hint 3

Why pairs are enough: after a `pop`, the stack returns exactly to a state it
was in before, and the pair now on top already records the minimum of that
earlier state — no recomputation needed. Duplicates of the minimum are handled
naturally since each copy carries its own `min` snapshot.
