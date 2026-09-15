# Solutions — Smallest Range Covering Elements from K Lists

## Min-Heap K-Way Merge

Any covering range can be shrunk until both of its endpoints coincide with actual list elements, so it suffices to consider ranges of the form [min, max] over selections picking one element from each list. As the selection's minimum element advances, the candidate ranges sweep through the possibilities in order — exactly the progression a k-way merge performs.

The solution seeds a min-heap with the head of every list, tagged with its list index and position, and tracks `cur_max`, the largest current head. Each round pops the smallest head: the pair [popped min, cur_max] covers all k lists and is compared against the best range so far, preferring a smaller width and, on ties, a smaller left endpoint (the problem's tie rule). The popped list then contributes its next element, which may raise `cur_max`, and the loop continues.

The loop stops the moment the popped element is the last of its list. From that point no selection can include an element from that list together with anything larger, so every later candidate would be strictly worse — the smallest achievable min has been reached. Tracking the maximum incrementally avoids re-scanning the k heads each round.

Every element enters and leaves the heap exactly once, and the heap never holds more than one element per list, so the merge costs logarithmic work per element.

**Complexity:** `O(N log k)` time, `O(k)` space, where `N` is the total number of elements and `k` the number of lists.
