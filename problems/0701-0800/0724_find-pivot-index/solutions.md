# Solutions — Find Pivot Index

## One pass with total and left sum

The definition names two quantities — the sum strictly left of an index and
the sum strictly right of it — and both follow from a single number: the
array total. If `left` holds the sum of everything before index `i`, then
the right sum there is exactly `total - left - nums[i]`, so `i` is a pivot
precisely when `left == total - left - nums[i]`. Summing the array once and
then carrying `left` through one scan evaluates that test in constant work
per index, with no prefix arrays and no recomputation.

The scan needs only the discipline of when to add: `left` starts at 0, which
is already the correct "nothing to my left" reading for index 0 — the edge
rule in the statement is the loop's initial state, not a special case. Each
index is tested before its element joins `left`, so the pivot itself stays
out of both sides, and returning at the first hit makes the answer leftmost
by construction. A full loop with no hit leaves `-1`. Example 1 tells the
whole story: total is 28, and at index 3 the left sum is 11 while the right
is 28 - 11 - 6 = 11, so 3 is returned without ever looking at indices 4
and 5; in Example 2 no index balances and the loop falls through to `-1`.

The values only ever get added, at most 10⁴ of them of magnitude at most
1000, so every sum the formula forms stays within ±10⁷ — far inside the
32-bit range every port computes in, and no wider arithmetic is needed
anywhere.

**Complexity:** `O(n)` time, `O(1)` space.
