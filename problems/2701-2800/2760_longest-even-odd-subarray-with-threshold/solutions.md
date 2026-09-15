# Solutions — Longest Even Odd Subarray With Threshold

## Restarting sliding window

A valid window is pinned down by its left edge: it must open on an element
that is even and within the threshold, and from there the right edge simply
stretches as far as adjacent parities keep alternating and every new element
stays within the threshold. So the scan walks a candidate start forward
whenever the current index cannot open a window — odd value, or value over
`threshold` — and whenever it can, extends the run to its natural end,
records the length, and resumes from the index where the extension stopped.

Nothing behind that stop point is worth revisiting. Every index strictly
inside a finished window only yields sub-windows that the full window already
dominates in length, and any longer candidate would have to cross the pair of
adjacent elements that ended the run — which fails one of the three
conditions by construction. The subtle case is resuming on the element that
caused the break: if it is even and within the threshold a fresh window opens
right there; if it is odd, or over `threshold`, the scan steps past it,
because such an element can never legally start a window.

Despite the nested loops each index is consumed at most once by an extension
across the whole scan, so the total work stays linear in the array length.
The answer is the longest window seen, and it remains `0` when no element
even qualifies as a start.

**Complexity:** `O(n)` time, `O(1)` space.
