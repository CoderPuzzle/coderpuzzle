# Solutions — Max Chunks To Make Sorted

## Prefix maximum sweep

Because `arr` is a permutation of `0..n - 1`, the sorted target is simply
`[0, 1, ..., n - 1]`, so a chunk sitting at positions `l..r` sorts into place
exactly when it holds precisely the values `l..r` — no other values may
occupy those slots. That turns "where can I cut" into a prefix question: a
boundary after index `i` is legal iff the first `i + 1` elements are exactly
the set `{0..i}`.

Since the elements are distinct and drawn from `0..n - 1`, that set condition
collapses to one comparison: the first `i + 1` elements are `{0..i}` iff
their maximum equals `i`. One left-to-right pass with a running maximum
therefore finds every legal boundary — whenever the running max lands exactly
on the current index, the prefix is self-contained and one chunk ends there.
Cutting at every legal boundary at once is optimal, because consecutive
boundaries carve out chunks that each hold exactly their own value range, so
sorting each chunk and concatenating reproduces the sorted array; and no
partition can use any other position, so the count of legal boundaries is the
answer.

In `[4,3,2,1,0]` the running max is 4 from the first element and only meets
its index at the last position, so the answer is 1 — any earlier cut would
drag the value 4 into a chunk that cannot sort into place, which is what the
failed split in Example 1 shows. In `[1,0,2,3,4]` the running max is 1 at
index 1, then 2, 3, and 4 land on their own indices, so the chunks are
`[1,0]`, `[2]`, `[3]`, `[4]` and the answer is 4. Only a counter and the
running maximum are kept, and both stay below `n`, so the narrowest integer
type is enough.

**Complexity:** `O(n)` time, `O(1)` space.
