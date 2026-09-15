# Solutions — Insertion Sort List

## Insertion sort with a dummy head

The statement mandates insertion sort, so the list itself must become the data structure the algorithm works on: a dummy node anchors a prefix that is always sorted, and one node at a time the input beyond that prefix is consumed. When the first unsorted node is already in order against the end of the prefix it simply stays put and the prefix grows by one; otherwise the node is unlinked, the prefix is walked to the predecessor of the first greater value, and the node is spliced in there. The dummy earns its keep on the very first insertion — the smallest node seen so far goes before the original head, and having a predecessor already waiting there is what keeps every splice a uniform two-pointer rewire.

Two families of input never pay the quadratic price, and the early-continue against the prefix tail is what buys them: an ascending list takes the O(1) stay-put branch at every node, and a descending list inserts each node at the front after a single comparison. The worst case is an input whose every node ranks just below the running maximum, such as `[3,1,5,3,7,5,…]` — each insertion walks nearly the whole prefix, giving the `n²/2` comparisons the textbook predicts at the statement's 5000-node ceiling.

Rust's nodes are owned `Box`es, so the sorted prefix cannot be read by two cursors at once and the tail of the prefix has no borrowable handle; the Rust solution instead detaches each input node and splices it into the sorted chain from the sentinel — the identical per-node detach-and-insert, losing only the constant-factor early-continue. The statement's follow-up asks for `O(n log n)` time in `O(1)` space; that question is left open here, as the statement intends, and every solution above remains the quadratic insertion sort it mandates.

**Complexity:** `O(n²)` time, `O(1)` extra space.
