# Solutions — Count Substrings Starting and Ending with Given Character

## Count the character, choose the pairs

A substring is fixed by its two endpoints, and the condition "starts and
ends with `c`" says exactly one thing about them: each endpoint must sit on
an occurrence of `c`. Everything between the endpoints is free, so the
interior never matters — the answer depends only on how many times `c`
appears.

Choosing a substring is therefore choosing two occurrences of `c`, the left
one and the right one, and the two may be the same occurrence (giving the
length-1 substring `"c"` itself). With `m` occurrences the count is the
number of pairs `i <= j` drawn from them: `m * (m + 1) / 2` — the triangle
number, not `m^2`, because a pair and its mirror describe the same
substring. At `n = 10⁵` all-`c` input this reaches 5,000,050,000, past the
32-bit range, so the product is computed in 64-bit arithmetic (JavaScript's
`Number` is exact here, as the bound sits far below 2⁵³).

**Complexity:** `O(n)` time, `O(1)` space.
