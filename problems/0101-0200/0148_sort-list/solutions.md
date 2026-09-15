# Solutions — Sort List

## Top-Down Merge Sort

Merge sort fits linked lists because every stage is pure relinking — no random access is ever needed. The list is halved with slow/fast pointers, each half is sorted recursively, and the two sorted halves are merged through a dummy head: repeatedly append the smaller front node and advance that half, then splice the leftover tail on when one side runs out. Taking from the first half on ties (`<=`) keeps the sort stable.

The midpoint walk starts fast one node ahead (`fast = head.next`), so slow finishes on the last node of the left half rather than the first node of the right. That detail is what makes the recursion terminate: cutting after slow leaves both halves strictly shorter than the original — even for a two-node list, which splits into single nodes — so the base case (empty or single-node list returned unchanged) is always reached.

![The cascade for [4,2,1,3]: split into [4,2] and [1,3], then into singletons, then merge into [2,4] and [1,3] and finally [1,2,3,4].](figures/solution-merge-sort-cascade.svg)

Halving at the midpoint keeps the recursion depth logarithmic, and because the nodes themselves are rewired in place, no auxiliary arrays are allocated at any level. This is the top-down formulation; the follow-up's strict O(1) memory would require the bottom-up variant, but the relinking merge already delivers the O(n log n) time with only the call stack as extra space.

**Complexity:** `O(n log n)` time, `O(log n)` space.
