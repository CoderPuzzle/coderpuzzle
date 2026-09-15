# Solutions — Smallest Subarray to Sort in Every Sliding Window

## Window Scans with Prefix and Suffix Extrema

Each window is solved independently (hint 1) with the classic boundary pair
of the "shortest unsorted continuous subarray" problem. Scanning the window
left to right with a running maximum pinpoints `right`: the last position
holding a value smaller than everything before it — any such element is out
of order and no sort can leave it in place, so the segment must extend at
least this far. Scanning right to left with a running minimum symmetrically
pinpoints `left`: the first position holding a value larger than everything
after it. Sorting `nums[left..right]` then fixes the window — outside the
segment every prefix already respects the running bound, and the segment's
own multiset re-sorts into the sorted window's slice — and the answer is
`right - left + 1`. A window with no violation never sets `right`, so its
answer is `0`, covering the already-sorted case for free.

Two short index scans per window — `2k` comparisons and `O(1)` extra state —
give `O(n · k)` over all `n − k + 1` windows, comfortably inside the `n ≤
1000` constraint; no stacks or extra structures are needed despite the topic
labels. Duplicate values are handled by the strict comparisons: equal
neighbors never set a boundary, so plateaus count as sorted.

**Complexity:** `O(n · k)` time, `O(1)` extra space beside the output.
