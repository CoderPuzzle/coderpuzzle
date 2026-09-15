# Solutions — Maximum of Absolute Value Expression

## Expand the absolute values into eight linear projections

The expression is the Manhattan distance between the 3-D points
`(arr1[k], arr2[k], k)`, and the identity `|A| + |B| + |C| =
max over signs of ±A ± B ± C` turns each distance into a maximum of eight
linear forms. Swapping the order of the two maxima — one maximum over the
eight sign choices, taken of a maximum over `k` — is what removes the
quadratic search entirely:

```text
max over i,j of the expression
  = max over (s1, s2, s3) of [ max_k s1·arr1[k] + s2·arr2[k] + s3·k
                             - min_k s1·arr1[k] + s2·arr2[k] + s3·k ]
```

For each of the eight sign triples the code scans once, tracking the running
maximum and minimum of the projection; their difference is the best that
sign choice achieves, and the answer is the largest difference of the eight.
Every pair `(i, j)` is dominated by one of these eight spans (pick the signs
of the three differences), and every span is achieved by some real pair (the
argmax and argmin indices), so the maximum equals the answer exactly.

All projections stay within about `2·10⁶ + 4·10⁴`, well inside 32-bit range,
and the whole computation is eight linear passes.

**Complexity:** `O(n)` time — eight passes with `O(1)` work per element —
and `O(1)` extra space beyond the input.
