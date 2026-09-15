# Solutions — Smallest Value After Replacing With Sum of Prime Factors

## Trial-division simulation to the fixed point

The replacement rule has exactly two kinds of resting values. For a prime
`p` the factor sum is `p` itself, and `4 = 2 · 2` maps back to `2 + 2 = 4`,
so both stand still. Every other composite `c = a · b` with `a, b >= 2`
shrinks: `a + b <= a · b` with equality only at `a = b = 2`, and the same
inequality applied factor-group by factor-group keeps the multiplicity
counted sum at most `c`, strictly below whenever `c != 4`. The sequence is
therefore non-increasing overall and strictly decreasing until it parks on a
prime or on 4, which makes "keep replacing until replacing stops helping"
an exact implementation of "smallest value ever taken" — not an approximation.

Each round factors its current value by trial division through ascending
divisors up to the square root: dividing out the smallest factors first is
what keeps the loop bounded, and the leftover above one contributes itself
as the final prime factor — satisfying the statement's multiplicity rule for
every repeated prime. Chains stay short because each accepted step drops the
value well below half its former size in practice, and every step is plain
arithmetic on values that never exceed the starting `10⁵`.

That bound settles everything else too: all intermediates fit a signed
32-bit integer in the compiled languages, JavaScript's arithmetic here uses
only `+ - * / %` on integers below `2⁵³` so exactness is safe, and there is
no recursion anywhere to worry about depth limits.

**Complexity:** `O(sqrt(n) · log n)` time over the whole simulation,
`O(1)` space.
