# Solutions — Next Greater Element IV

## Dual Monotonic Stacks

Finding the second greater element is the classic next-greater-element stack trick applied twice. Maintain a stack `first` of indices still waiting for their first greater value, kept non-increasing by value; when a new value `x` arrives, every index it pops from `first` has just found its first greater element. Those indices are not finished — they now need a _second_ greater value — so they graduate into a second stack instead of disappearing.

The second stack holds indices awaiting their second greater value, and a new `x` answers `result[j] = x` for every index `j` it pops from its top. For this to pop correctly, `second` must also be monotonic non-increasing by value. The catch is ordering: when `x` pops a batch from `first`, the batch comes off in increasing order of value (deepest stack entries have the smallest values), so pushing it across verbatim would put the largest value on top of `second` and break its monotonicity. Reversing the batch before appending restores the invariant, which is why the code collects the popped indices and pushes them back-to-front.

Every index is pushed onto `first` once, moves to `second` at most once, and is popped from `second` at most once, so the total work across all the inner while-loops is linear. Indices still stuck in either stack at the end never met their greater values and keep the `-1` the result array was initialized with — including the tied-equal case `[3,3]`, since the strict `<` comparison does not treat an equal value as greater.

**Complexity:** `O(n)` time, `O(n)` space.
