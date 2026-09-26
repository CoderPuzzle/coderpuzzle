# Solutions — Remove Methods From Project

Two facts decide the answer. First, the suspicious group is exactly the
set of methods reachable from `k` along invocation edges, so one
traversal over the forward graph marks it. Second, the group may only be
removed when no method outside it invokes into it — a single outside
invocation of any suspicious method blocks the whole removal.

## Reachability scan with an iterative traversal

Build the forward adjacency of `invocations` and mark the suspicious
group with an iterative DFS from `k` (an explicit stack, since a
`10⁵`-long invocation chain would overflow the recursion limits of the
judged runtimes). Then scan the edge list once: if any edge runs from a
non-suspicious tail to a suspicious head, some outside method invokes
into the group, and the answer is every method `0 .. n - 1`. Otherwise
the removal goes through, and the answer is every method the traversal
did not mark, emitted in ascending order.

![In Example 1 (n = 4, k = 1), the iterative DFS from method 1 shades the suspicious set {1, 2}, but the outside edges 0 → 1 and 3 → 2 invoke into that set, so nothing can be removed and the answer stays [0, 1, 2, 3].](figures/solution-outside-invocation-blocks.svg)

Both passes are linear over the graph, so even the maximum shape —
`n = 10⁵` methods and `2 * 10⁵` invocations — is a single linear sweep
per structure. A BFS frontier instead of the DFS stack, or scanning the
reverse adjacency to detect the outside feeders, produces the same
partition; the edge scan after the traversal is the cheapest way to
apply the "no outside invoker" rule because it needs no extra bookkeeping
beyond the suspicious marks it already has.

**Complexity:** `O(n + m)` time, `O(n + m)` space.
