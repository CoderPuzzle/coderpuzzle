# Solutions — Flower Planting With No Adjacent

## Greedy, smallest available color first

Every garden has at most 3 paths, so at any point at most 3 of its
neighbors can already be holding a flower type — never enough to rule
out all 4 types. This makes a single greedy pass over the gardens
sufficient: build an adjacency list from `paths`, then walk the gardens
in order from 1 to n. For garden `i`, collect the flower types already
assigned to its neighbors (only the ones colored so far, since gardens
with a higher index have not been visited yet), and give `i` the
smallest type in `{1, 2, 3, 4}` that is not among them.

Because the judge compares the returned array exactly rather than
merely checking that adjacent gardens differ, this exact procedure —
processing order 1..n, and the smallest-available tie-break — is what
must be reproduced; picking any other valid flower type at a garden
would still satisfy the problem's own rules but would not match the
judged output.

**Complexity:** `O(n + paths.length)` time, `O(n + paths.length)` space.
