# Solutions — Maximum Number of Groups Entering a Competition

## Count how many triangular sizes fit, ignoring the grades

Only the group sizes and sums are constrained, never which students sit
where. Sorting the grades therefore removes all difficulty: once the
students stand in ascending order, any increasing sequence of sizes
`s_1 < s_2 < ... < s_k` yields strictly increasing sums too, because the
i-th group takes the next `s_i` students in line and a bigger group both
starts later (every student it skips had a grade less than or equal to the
ones it admits) and reaches further. With order restored for free, the
grades themselves become irrelevant — only `n = len(grades)` matters.

So the question reduces to: what is the largest k with sizes 1, 2, ...,
k feasible, i.e. `1 + 2 + ... + k <= n`? Sizes 1..k need at least that
many students, and they are also the cheapest way to reach k groups: any
other size sequence with k groups dominates it term by term, so if even
`k(k+1)/2` students do not suffice, no arrangement forms k groups. When
`k(k+1)/2 <= n` but `(k+1)(k+2)/2 > n`, the leftover students merge into
the last group — keeping every earlier pair strictly ordered and growing,
so exactly k groups always form. The answer is the largest k with
`k(k+1)/2 <= n`, computed from `k = floor((sqrt(8n + 1) - 1) / 2)`.

**Complexity:** `O(1)` time, `O(1)` space.
