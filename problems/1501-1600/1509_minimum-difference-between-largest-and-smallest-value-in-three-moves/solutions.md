# Solutions — Minimum Difference Between Largest and Smallest Value in Three Moves

## Sort and try the four boundary splits

When `nums` has four or fewer elements, all of them can be changed to the
same value in at most three moves, so the answer is always `0`. Otherwise,
sorting `nums` turns the problem into a much narrower question: an optimal
solution never touches the interior of the sorted array, because changing
a middle element to match its neighbors can only be as good as, never
better than, spending that same move on a current extreme. So the three
moves are always best spent trimming elements off the low end, the high
end, or some mix of both.

That leaves exactly four ways to split three moves between the two ends —
0 from the low end and 3 from the high end, 1 and 2, 2 and 1, or 3 and
0 — and after removing `i` elements from the front and `3 - i` from the
back, the remaining difference is `sorted[n - 1 - (3 - i)] - sorted[i]`.
The code sorts once and takes the minimum of those four candidate
differences directly; no removal is ever simulated, since the surviving
window's endpoints are already known once `i` is fixed.

**Complexity:** `O(n log n)` time, `O(1)` extra space beyond the sort.
