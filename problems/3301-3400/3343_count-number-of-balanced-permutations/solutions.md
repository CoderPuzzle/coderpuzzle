# Solutions — Count Number of Balanced Permutations

A permutation is balanced when its even-index digit sum equals its
odd-index digit sum, so among the distinct rearrangements we only have to
count the ways to split the digit multiset into an even-slot part and an
odd-slot part of the right sizes with equal sums — the order inside each
part contributes plain factorials. With n ≤ 80 the counts explode past
64-bit immediately, so everything runs modulo 10⁹ + 7; the hints sketch
the state design, and the multinomial algebra closes it into a small
iterative DP.

## Digit-frequency DP over (even slots, even sum)

For each digit `d` with `cnt[d]` copies, choose `a_d` copies to occupy
even indices. The constraints are `Σ a_d = ⌈n/2⌉` (the number of even
indices), and `Σ d·a_d = total / 2` — the odd-index sum is then implied
without a state, as hint 4 promises, since both parts together sum to
`total`. Each choice contributes `Π C(cnt[d], a_d)`, accumulated by a
bottom-up DP over the ten digits whose states are the two quantities
hint 3 names: even slots used so far and their digit sum. A length-80
string keeps the table at about 10 × 40 × 360 states.

The DP value is a sum over assignments of binomial products; converting
to distinct strings multiplies by `⌈n/2⌉! · ⌊n/2⌋! / Π cnt[d]!` — the
arrangements of the even-slot multiset times the odd-slot one, divided
by the per-digit copy permutations the binomials already counted. That
single division is one modular inverse (Fermat, exponent 10⁹ + 5), and
every multiplication fits a 64-bit product since residues stay below
2³⁰; JavaScript keeps its raw products under Number's exact range by
splitting one factor into 15-bit halves. An odd digit total answers 0
immediately, as in the third example.

**Complexity:** `O(10 · E · total · c_max)` time with `E = ⌈n/2⌉` and
`c_max` the largest digit count — a few million state visits for n = 80
— and `O(n² + n · total)` space, all modulo arithmetic.
