# Solutions — Wiggle Sort II

## Sort, then reverse-interleave the halves

The even positions are the valleys and the odd ones the peaks, and there are
`m = (n + 1) // 2` valleys against only `n - m` peaks, so a sorted copy of
the array splits the work naturally: the lower half `sorted[:m]` feeds the
even positions and the upper half `sorted[m:]` the odd ones. Interleaved that
way, every adjacent pair already compares the right way around; the remaining
question is what to do with equal values.

Reversing each half on the way out is what makes duplicates safe. A value may
legally repeat up to `ceil(n / 2)` times, and at that weight its copies
straddle the split — the tail of the lower half and the head of the upper
half can be the same number. A forward interleave then seats two of those
copies side by side and the strict wiggle breaks: on `[4,5,5,6]` it leaves
the array `[4,5,5,6]` unchanged. Reversal instead drains the lower half into
the left valleys and the upper half into the right peaks, holding equal
values as far apart as the layout allows — far enough that, under the
statement's guarantee, no adjacent pair can tie. Concretely each even
position `2k` receives `sorted[m - 1 - k]` and each odd position `2k + 1`
receives `sorted[n - 1 - k]`, the reorder happens in place, and the mutated
array is returned as the answer.

Sorting dominates the cost; the redistribution pass is linear. (The follow-up
is answerable in principle — a quickselect median plus three-way partitioning
through virtual indexing reaches average `O(n)` time with `O(1)` extra space
— but the sorted reverse interleave above is the canonical procedure this
problem's output is pinned to.)

**Complexity:** `O(n log n)` time, `O(n)` space.
