# Solutions — Count Pairs Of Nodes

## Degree sums with a multiplicity correction

Nothing about a pair matters except how many edges touch it, so the graph
reduces to the degree of every node (parallel edges counted separately)
plus, for each pair joined by at least one edge, the number of edges the
two endpoints share: `incident(a, b) = deg[a] + deg[b] - mult(a, b)`, since
an edge between `a` and `b` is incident to both and would otherwise be
counted twice.

Dropping `mult` first, sorting the degrees lets two pointers count every
unordered pair with `deg[a] + deg[b] > k` in one `O(n)` sweep per query.
Only pairs joined by an edge can be overcounted, and query `k` overcounts
exactly those whose degree sum `s` exceeds `k` while the true incident
count `t = s - mult` does not. Collecting `s` and `t` over the connected
pairs into two sorted arrays turns that correction into
`#{s <= k} - #{t <= k}` — the set `{s <= k}` sits inside `{t <= k}`, their
difference being precisely the overcounted pairs — at the cost of two
binary searches per query.

Degrees never exceed `10⁵` and pair counts never exceed
`n(n-1)/2 < 2 * 10⁸`, so 32-bit integers carry every intermediate value in
every language (and JavaScript's doubles are exact far below `2⁵³`).

**Complexity:** `O((E + n) log(n + E) + qn)` time, `O(n + E)` space.
