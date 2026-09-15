# Solutions — Sort an Array

The rules out front — no library sort, `O(n log n)` time, smallest workable
space — point at the classic hand-written sorts. This guide implements
bottom-up merge sort: the iterative, width-doubling form that needs no
recursion at all and exactly one auxiliary array, so its only space beyond
the answer itself is a single `O(n)` scratch buffer.

## Bottom-up merge sort

Start from the fact that every single element is a sorted run of length 1.
A pass at width `w` walks the array in strides of `2w` and merges each pair
of adjacent sorted runs of length `w` — the pair's two index heads advance
while both runs are live, each step copying the smaller head — so the pass
replaces runs of length `w` with sorted runs of length `2w`. After
`ceil(log2 n)` passes the entire array is one sorted run; a run straddling
the end is simply shorter, and clamping the three boundaries with `min`
keeps the merge correct. Because the doubling starts at `w = 1`, no
recursion and no run-splitting bookkeeping is ever needed.

Source and buffer alternate roles: each pass reads from `source` and writes
every position of `buffer` exactly once (the merge drains both heads, then
copies whichever run still holds values), and the two arrays swap
afterward. That full coverage is what makes the swap safe — no position
survives from two passes ago. On ties the merge takes the left run's head
first, so equal values keep their input order: the sort is stable, and for
plain integers that is also what makes the output exactly the one pinned
ascending order, duplicates included.

The honest rivals: heap sort drops the scratch buffer to `O(1)` extra space
but hops around memory in a jumpier pattern and loses the stability
guarantee, while counting or radix sort exploit this problem's narrow value
range to beat `O(n log n)` outright — real options, but neither is as
portable a lesson in the divide-and-conquer structure the topics row names.
Merge sort asks only that values be comparable and answers in `O(n log n)`
regardless of the range.

**Complexity:** `O(n log n)` time, `O(n)` space.
