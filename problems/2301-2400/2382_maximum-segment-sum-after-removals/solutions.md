# Solutions — Maximum Segment Sum After Removals

## Reverse removals with union-find

Removals split segments, which is awkward to maintain, but the reverse process only ever merges: run time backwards and treat each removal as an activation. Start from the fully emptied array, activate positions in the reverse order of `removeQueries`, and after each activation record the maximum segment sum; reversing the recorded list at the end gives the answers in query order. The final entry is 0, since after the last removal nothing remains.

Activation of index `i` marks it active with segment sum `nums[i]` and union-finds it with any active neighbor `i - 1` or `i + 1`. The union keeps the component's total at the new root (`ssum[b] += ssum[a]` when `a` is attached under `b`), so `ssum[find(i)]` is the sum of the whole merged block. Because activations only grow segments, the running maximum `best` is monotonically non-decreasing across the reversed timeline, which is exactly why a single `max` per step suffices with no stale entries to evict.

The loop covers `removeQueries[1:]` in reverse (the very first removal corresponds to the state where all other positions are still active), and the initially appended 0 becomes the last answer after the reversal. `find` uses path halving, keeping the near-constant amortized cost of union-find, and each activation performs at most two unions.

**Complexity:** `O(n α(n))` time, `O(n)` space.
