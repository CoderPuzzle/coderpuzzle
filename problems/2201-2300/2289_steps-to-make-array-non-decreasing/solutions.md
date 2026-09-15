# Solutions — Steps to Make Array Non-decreasing

## Monotonic stack of removal steps

An element is eventually removed if and only if some strictly greater element lies to its left — the survivors are exactly the prefix maxima (with ties kept, since removal requires strict `nums[i-1] > nums[i]`). So instead of simulating rounds, compute for every element the round in which it disappears and take the maximum; the stack stores pairs `(value, step)` and processes the array left to right, maintaining exactly those elements not yet removed whose removal round is still pending.

For a new element `x`, everything on the stack with value `<= x` will be gone by the time `x` faces its executioner, so all such entries are popped while remembering the largest step among them — call it `cur`. If the stack still has an entry afterwards, its top is the nearest strictly greater survivor to the left; that element outlives the whole popped chain and removes `x` one round after the chain finishes collapsing, hence `cur + 1`. If instead the pops emptied the stack, nothing to the left can ever strictly exceed `x`, and `x` is immortal with step 0. Popping with `<=` rather than `<` is what encodes strictness: equal values cannot remove each other, but an equal entry still perishes behind the same strictly-greater blocker and its step correctly feeds `cur`. The running answer is the maximum step ever pushed.

![The example array with each element's removal round as a badge: the prefix maxima 5, 7, 11, and 11 survive at step 0 while the others fade through steps 1, 2, and 3, and the stack snapshot shows the second 4 popping the earlier 4 at step 2 before inheriting step 3 from the surviving 5.](figures/solution-removal-steps.svg)

Since each element is pushed exactly once and popped at most once, the scan is linear. On an already non-decreasing array, each arriving element pops the entire remaining stack, so the stack empties, every step stays 0, and the answer is 0.

**Complexity:** `O(n)` time, `O(n)` space.
