# Solutions — Trionic Array I

## One scan through the three stretches

The shape leaves no freedom in where its two cut points sit. If a valid `p`
exists at all, the descent out of it is mandatory (`q > p`), so `nums[p] >
nums[p + 1]`; that drop is exactly what stops the strictly increasing
prefix, so the prefix cannot survive past `p` — and the definition requires
it to reach `p`. Any valid `p` therefore equals the end of the maximal
rising prefix, and the same push-as-far-as-it-goes argument fixes `q`:
extending the descent to its natural end only shrinks the tail that still
has to rise, so if some pair works, the greedy pair does too.

One scan settles it. Walk the leading strictly increasing run to its end —
the peak. The peak needs company on both sides: at least one rising step
behind it, room before the last index, and a strict drop immediately ahead.
A flat step anywhere is fatal no matter how you cut, because that equal
neighbor pair lands inside one of the three stretches regardless of where
`p` and `q` go. From the peak, walk the strictly decreasing run to its end
— the valley — which must likewise stop before the last index and be
followed by a strict rise rather than a flat step. Finally the rest of the
array must climb without interruption; the answer is yes exactly when that
closing walk reaches the end.

Every element takes part in at most a couple of comparisons across the
three walks, and nothing but the moving indices is remembered.

**Complexity:** `O(n)` time, `O(1)` space.
