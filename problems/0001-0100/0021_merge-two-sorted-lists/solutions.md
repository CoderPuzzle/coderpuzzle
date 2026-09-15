# Solutions — Merge Two Sorted Lists

Two equivalent merges: both consume the two lists node by node in sorted
order, both relink the existing nodes rather than allocating, and both take
`list1`'s head on ties. They differ only in whether the walk is driven by a
loop with a tail pointer or by the call stack.

## Iterative

Because both input lists are already sorted, the merged list is fixed: its next node is always the smaller of the two current heads. A dummy head node lets the loop attach that node without treating the first attachment as a special case — `tail` starts at the dummy and the real head is simply `dummy.next` at the end.

The walk: while both lists are non-empty, link the smaller head to `tail`, advance that list, and step `tail` forward. Ties take `list1` first, which keeps the merge stable with respect to the first list. When one list runs out, its nodes are exhausted in sorted order, so whatever is left of the other list is already the sorted continuation — splice it onto `tail` in one assignment instead of walking it. Empty inputs need no special handling: the loop is skipped and the splice attaches whichever list (possibly neither) survives.

Every iteration permanently consumes one node from one list, so the total step count is the combined length; and since the merge relinks existing nodes (the dummy is the only allocation), extra memory is constant.

**Complexity:** `O(n + m)` time, `O(1)` space.

## Recursive

The same decision made one node at a time by the call stack. The base case writes itself: if either list is empty, the other list — whatever remains of it — is already sorted, so it is the merged continuation as is. Otherwise the smaller current head is the merged list's next node; the recursion merges what follows it with the untouched other list, and the call reattaches that result as the head's new tail. `<=` takes `list1` on ties, the same stability rule as the iterative walk.

Each call consumes one node for good, so the recursion bottoms out after n + m calls, and relinking allocates nothing. The trade is the call stack, which grows one frame per merged node — the depth the iterative version avoids. (The Rust port takes a small ownership detour — detach the winner's tail so the recursive call owns it, then reattach the merged remainder — but chooses the same node on every call.)

**Complexity:** `O(n + m)` time, `O(n + m)` space for the call stack.
