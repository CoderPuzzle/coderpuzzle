# Solutions — Find the Largest Palindrome Divisible by K

A palindrome of length `n` is completely determined by its first
`ceil(n / 2)` digits, and comparing two palindromes of the same length is
just comparing those halves left to right — so "largest" means
"lexicographically largest half". Divisibility is the only thing coupling
the digits to each other, and it does so through remainders alone, which
keeps every step of the search inside a handful of small integers. An answer
always exists because the number `k` repeated `n` times is both a palindrome
and divisible by `k`, so even the smallest legal leading digit can complete.

## Residue sets over the first half

The mirror structure turns into per-position weights. If the half's digit at
position `j` is placed at `10^(n-1-j)`, its twin sits at `10^j`, so that
digit contributes `(10^(n-1-j) + 10^j)` to the value — except the middle
digit of an odd length, whose two copies coincide and count once. Reducing
every weight mod `k`, the whole palindrome is congruent to the sum of
`digit * weight(j)` over the half, and no step of the algorithm ever needs
the full n-digit number, only residues mod `k`.

What remains is choosing digits greedily without dead ends. For each suffix
of the half, compute the set of residues the still-free positions can add:
scanning from the back, one more free position grows the set by every sum
`d * weight(j) mod k` with `d` in `0..9`. These sets only ever grow as
positions free up, so at most `k` distinct sets appear; each is a k-bit mask
built by rotating the next set through the multiples of the weight, cached
per (set, weight) pair. A forward sweep then fixes the half one digit at a
time, always taking the largest digit whose leftover requirement stays
inside the next suffix's set — feasibility is checked exactly, so the greedy
never paints itself into a corner, and the final free digit closes the
residue to zero precisely. The all-`k` repdigit guarantees the very first
digit has a legal choice of at least 1, so no leading zero ever appears.

**Complexity:** `O(n * k)` time, `O(n)` space.
