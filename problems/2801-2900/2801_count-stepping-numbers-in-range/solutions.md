# Solutions — Count Stepping Numbers in Range

## Digit DP against each bound

Both bounds are up to 100-digit strings, so the range is never materialized —
the answer is `f(high) - f(low - 1)`, where `f(x)` counts stepping numbers in
`[1, x]`. The subtraction needs `low - 1` as a string too: a short borrow pass
turns trailing zeros into nines, decrements the first non-zero digit, and
strips the collapsed leading zero (`"100"` becomes `"99"`, `"1"` becomes
`"0"`, for which `f` is 0).

`f(x)` splits by length. A table `ways[m][d]` holds the mod-count of ways to
append `m` further digits after a digit `d`, each differing by exactly 1 from
its predecessor: `ways[0][d] = 1` and `ways[m][d]` sums the two neighbors
`ways[m-1][d-1] + ways[m-1][d+1]`, clipped at the digit range's edges. Every
length below `len(x)` then contributes `sum over first digit 1..9` — a longer
number with no leading zero always beats a shorter one, so no comparison is
needed there. Numbers of `x`'s own length are counted by walking `x`'s digits
under a tight flag: at position `i`, each digit smaller than `x[i]` that
continues the stepping prefix settles the comparison right there, contributing
`ways[n-1-i][choice]` completions of the tail; the walk then follows `x`'s own
digit, and the first adjacency violation kills the equal-prefix chain, since
every later contribution would need that prefix. If the whole walk survives,
`x` itself is stepping and counts.

Everything runs iteratively — the table is filled bottom-up and the walk is a
loop, no recursion at any depth. All arithmetic is modulo `10⁹ + 7`, and every
value that exists at any point is a residue below `2³¹`, so 32-bit integers
carry it in Java and C++ as well; the wire value in `[0, 10⁹+6]` fits `i32`
even though the true count reaches ~1.86×10²⁹ over the full range.

**Complexity:** `O(L)` time, `O(L)` space, where `L = high.length` — two
table builds of `10·L` cells and two linear walks.
