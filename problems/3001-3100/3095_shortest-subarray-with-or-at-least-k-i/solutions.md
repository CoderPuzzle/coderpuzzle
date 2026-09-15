# Solutions — Shortest Subarray With OR at Least K I

## Right-edge scan with running OR

Only subarrays matter, so fix each right endpoint `r` and extend the left
edge leftwards keeping one running OR of the window `nums[l..r]`. The
first `l` (largest index, because the scan runs from `l = r` downward)
whose window reaches `k` yields the shortest special subarray that ends
at `r`; longer windows ending there cannot beat it, so the inner loop can
stop at the first hit. Taking the minimum over all right endpoints
explores enough candidates to rule out missing an optimum: any shortest
special subarray has some right endpoint where this scan finds it or an
equally short window.

Nothing here needs bit accounting beyond the plain integers themselves:
with values at most 50 the OR of any number of them stays below `2^6`,
and `k < 64` by constraint, so the running value never approaches even a
32-bit ceiling — a property worth noticing because the sequel problem's
bounds break it. At most `n²/2` element-OR steps run over `n ≤ 50`
elements, comfortably instant everywhere.

**Complexity:** `O(n²)` time, `O(1)` space.
