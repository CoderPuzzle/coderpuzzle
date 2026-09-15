# Solutions — Minimum Operations to Make Binary Array Elements Equal to One II

## Forced left-to-right greedy sweep

Index 0 is contained in exactly one flip — the one starting at itself —
so the very first decision (flip at 0 or not) is forced by `nums[0]`.
After that forced flip the prefix 0..0 equals 1 and any later flip starts
at index >= 1, never touching it again; inductively, when the sweep sits
at index i with everything before it already 1, whether `nums[i]` reads
as 1 or 0 depends only on the parity of flips performed so far. If it
reads 0, flipping here is mandatory and unique; if it reads 1, flipping
here would be pure waste since that suffix flip must eventually be undone
by another flip no later than this position's needs.

One pass therefore counts an operation exactly where the parity-adjusted
bit is 0, toggling a boolean each time. Each array index can trigger at
most one operation, so for `n <= 10^5` the answer fits comfortably in
32 bits (`<= n`), well inside every language's native integer.

**Complexity:** `O(n)` time, `O(1)` extra space.
