# Solutions — Distinct Points Reachable After Substring Removal

## Sliding window over displacement sums

Moves add like vectors, so order is irrelevant to where a walk ends: the
endpoint left after deleting the window `s[i..i+k)` is exactly the endpoint
of the full walk minus the window's own displacement vector. That collapses
every candidate deletion to a single pair of numbers — there is never a need
to re-walk the surviving moves. One pass over `s` fixes the total
displacement `(tx, ty)`, and one more pass primes the displacement of the
first window.

Slide the window across `s`, updating its displacement in constant time per
step — subtract the outgoing move's vector, add the incoming one — and drop
the point `(tx - wx, ty - wy)` into a hash set for each of the `n - k + 1`
window positions. When `k` equals `n` there is a single position and the
remainder is empty, which the same formula handles untouched: both window
and total cancel and the lone point is the origin. The answer is the set's
size, since equal window displacements are precisely the deletions that
coincide on a final coordinate.

Every component of every displacement lies in `[-n, n]`, so the bookkeeping
is comfortably exact everywhere: the compiled languages pack each point into
one 64-bit key (shift or multiply one shifted-positive component next to the
other), Rust hashes the `(i32, i32)` pair directly, Python uses a tuple, and
JavaScript joins the two components into a short string key — magnitudes
that stay far below doubles' `2⁵³` exactness in any case.

**Complexity:** `O(n)` time, `O(n)` space.
