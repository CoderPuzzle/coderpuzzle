# Solutions — Intersection of Two Arrays II

Both sweeps answer the same multiset question: a value belongs in the
result exactly `min(count in nums1, count in nums2)` times, and the two
approaches differ only in how they police that budget. The hash map makes
it a lookup — count one array, then spend each value's remaining budget
walking the other. Sorting gets the same answer from order alone: with
both arrays ascending, two indexes meet every shared copy exactly where
the sequences agree, and the result leaves the walk already sorted.

## Hash-map counts, then walk

The intersection here is a multiset question: a value belongs in the result
exactly `min(count in nums1, count in nums2)` times. Counting how often each
value occurs in `nums1` turns that formula into a lookup — the map answers
"how many copies of this value may still join" in constant time.

The code then walks `nums2` once, appending each value whose count is still
positive and decrementing that count. The falling counter is what enforces
the min: once a value's budget reaches zero, later copies of it in `nums2`
are skipped, so every shared value contributes exactly its smaller count and
nothing else survives. Because the judge compares arrays exactly, the picked
values are sorted ascending before returning — for `nums1 = [4,9,5]` and
`nums2 = [9,4,9,8,4]` the picks `[9,4]` come back as `[4,9]`.

The follow-ups all bend the same idea. When one array is much smaller than
the other, count the smaller one so the map stays small. When both arrays
arrive already sorted, the map disappears entirely: two indexes walking the
arrays in lockstep emit the intersection in one coordinated pass. And when
`nums2` lives on disk with room for only chunks of it in memory, counting
survives streaming — hold `nums1`'s counts in memory, feed in `nums2` one
chunk at a time, and pick from each chunk as it passes.

**Complexity:** `O(n + m + k·log k)` time, `O(n)` space (n, m the input
lengths, k the intersection's).

## Sort both arrays, walk two pointers

Sorting retires the map by giving both arrays the same shape: ascending
values, so a shared copy can only live where the two orders agree. The
code sorts `nums1` and `nums2` in place and keeps one index into each. At
every step the smaller current value advances alone — nothing ahead on the
other side can still match it — and when the two currents are equal, that
value joins the result once and both indexes advance together.

That tie step carries the whole min rule: every emission spends one copy of
the value on each side, so a value occurring `p` times in `nums1` and `q`
times in `nums2` is emitted exactly `min(p, q)` times before one of its two
runs is spent. And because the walk visits values in ascending order, the
picks leave the loop already sorted — the re-sort that pinned the hash-map
walk's output disappears along with the map itself.

**Complexity:** `O(n·log n + m·log m)` time, `O(1)` space beyond the
output (n, m the input lengths; both sorts run in place and the walk
allocates nothing else).
