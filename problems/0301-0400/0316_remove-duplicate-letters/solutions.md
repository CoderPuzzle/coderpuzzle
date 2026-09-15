# Solutions — Remove Duplicate Letters

## Greedy Monotonic Stack with Remaining Counts

The result must contain each letter exactly once, be a subsequence of the input, and be lexicographically smallest. The solution builds it on a stack with a local-exchange argument: if the current character is smaller than the stack top and that top character still occurs later in `s`, popping the top and taking the smaller character now can only improve the result — the popped letter can always be re-added from a future occurrence, and the prefix just got lexicographically smaller.

Two auxiliary structures make each decision safe and cheap. A `count` map tracks how many occurrences of each letter remain _after_ the current position (decremented as each character is consumed), so the pop condition `count[stack[-1]] > 0` knows whether discarding the top is reversible. An `in_stack` set answers membership in constant time and enforces uniqueness: a character already placed is skipped entirely, because pushing a second copy could never help and its later occurrence may still be needed to sit after a smaller character.

The walk is a single pass: decrement the count, skip if already placed, otherwise pop while the top is larger and still re-occurable, then push. Each character is pushed at most once and popped at most once across the whole run, so the pops amortize to linear total work even though the inner loop looks nested. The stack contents are strictly increasing whenever possible and always form the greedy-optimal prefix.

Edge cases: a string whose letters each appear once is returned unchanged (nothing ever pops, since no future occurrence exists); a string like `"cbacdcbc"` demonstrates both mechanisms — the initial `cb` is popped when `a` arrives, and the later `c` and `b` are skipped because they are already placed. The auxiliary structures are bounded by the 26-letter alphabet.

![Stack snapshots for s = "cbacdcbc", one column per character: b pops c, a pops b, both later c's are skipped as already placed, b is pushed, and the final stack reads acdb.](figures/solution-monotonic-stack.svg)

**Complexity:** `O(n)` time, `O(1)` space.
