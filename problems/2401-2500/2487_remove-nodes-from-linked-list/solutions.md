# Solutions — Remove Nodes From Linked List

## Reverse and Filter by Suffix Maximum

A node survives only if no strictly greater value appears to its right, which is a statement about the maximum of the suffix that follows it. Suffix information is awkward to use in a forward pass but trivial in a backward one, so the first step is to reverse the list with the standard three-pointer loop. After reversal, "somewhere to the right in the original order" becomes "already seen", and the decision for each node reduces to comparing it against a running maximum.

![The original list 5-2-13-3-8, its reversal with keep/drop decisions against the running maximum, and the rebuilt result 13-8.](figures/solution-reverse-filter.svg)

Walking the reversed list, keep `max_seen` as the largest value encountered so far (the suffix maximum of the original list). A node with `val >= max_seen` has nothing strictly greater behind it and survives: update `max_seen` and prepend the node to a new result list, which naturally rebuilds the output in the original left-to-right order. A node with `val < max_seen` is dropped by simply not linking it in.

Using `>=` rather than `>` in the comparison is what makes equal values coexist — a list of identical nodes such as `[1,1,1,1]` keeps everything, since a strictly greater value never appears. `max_seen` starts at negative infinity so the last node of the original list (the first one examined) always survives. Both passes touch each node a constant number of times and reuse the existing nodes' `next` pointers, so no auxiliary containers are needed.

**Complexity:** `O(n)` time, `O(1)` space.
