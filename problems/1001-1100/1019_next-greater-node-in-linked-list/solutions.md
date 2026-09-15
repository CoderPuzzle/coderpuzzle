# Solutions — Next Greater Node In Linked List

## Monotonic stack of indices

A linked list cannot be indexed, so the first step copies the node values into an array; the answer array is pre-filled with zeros, which is already the correct value for any node that never finds something larger.

The scan maintains a stack of indices whose values are strictly decreasing from bottom to top — indices still waiting for their next greater node. When `value` arrives, every stacked index whose value is strictly smaller has just found it: the inner `while` pops those indices and writes `value` into their answer slots. Then the current index is pushed to await its own resolver. The strict comparison matters: equal values do not resolve each other, since the problem asks for strictly larger.

Each index is pushed exactly once and popped at most once, so all the popping across the entire run costs no more than the pushes. Whatever remains on the stack at the end has nothing greater to its right and keeps its initialized 0 — no post-pass is needed.

**Complexity:** `O(n)` time, `O(n)` space for the values array, answer, and stack.
