# Solutions — Direction Assignments with Exactly K Visible People

## Combinatorial closed form

Whether a person is seen by `pos` is decided entirely by their own choice:
someone to the left is visible exactly when they pick `'L'`, someone to the
right exactly when they pick `'R'`. With `a = pos` people on the left and
`b = n - pos - 1` on the right, the number seen is the count of left people
who picked `'L'` plus the count of right people who picked `'R'`, and the
person at `pos` never affects that total.

Choosing `i` of the `a` left people to be visible contributes
`C(a, i)` ways (they must pick `'L'`, the rest pick `'R'`), and choosing
`k - i` of the `b` right people contributes `C(b, k - i)` ways. Summing
over every valid split `i + (k - i) = k` and multiplying by the two free
choices of the person at `pos` gives the answer. Vandermonde's identity
collapses that whole sum to a single binomial: it equals
`2 * C(a + b, k)`, and `a + b = n - 1`.

So the task reduces to computing one binomial coefficient modulo
`10⁹ + 7`. Factorials and inverse factorials up to `n - 1` are built in
one pass each, `C(n - 1, k)` is read off with two modular multiplications,
and doubling it yields the answer. All products are reduced modulo
`10⁹ + 7` so intermediate values stay bounded and fit comfortably in a
64-bit integer.

**Complexity:** `O(n)` time, `O(n)` space.
