# Solutions — Reverse Nodes in Even Length Groups

## Reverse each even group in place

Walk through target group sizes `1, 2, 3, ...`. Before changing a group, follow at most that many links to determine its actual length, since the final group may be shorter. Odd-length groups only move the previous-group pointer forward; even-length groups reverse exactly their available nodes and reconnect both ends to the surrounding list.

After a reversal, the group's original first node becomes its tail and therefore the anchor for the next group. All traversal and reversal is iterative, so the maximum-length list does not consume recursion stack space.

![Example 1's [5, 2, 6, 3, 9, 1, 7, 3, 8, 4] cut into groups of length 1, 2, 3, 4: the two even groups reverse in place, giving [5, 6, 2, 3, 9, 1, 4, 8, 3, 7] with each reversed group's old head rewired as the tail anchoring the next group.](figures/solution-reverse-even-groups.svg)

**Complexity:** `O(n)` time and `O(1)` extra space.
