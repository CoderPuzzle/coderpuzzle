# Solutions — Smallest Palindromic Rearrangement II

## Rank-walk over the forced half with capped multinomials

As in part I, a palindrome of `s` is `(half arrangement) + odd letter +
reverse(half)`, and the half's multiset is forced: `count[c] / 2` of each
letter, `m = n / 2` letters total. Distinct palindromic permutations are
therefore in bijection with distinct arrangements of that half multiset, so
the answer's first half is the `k`-th smallest arrangement of the multiset —
built one position at a time, smallest letter first.

At each position the walk tries every candidate letter `c` in alphabetical
order and asks how many arrangements of the _remaining_ multiset begin with
`c`: that count is the multinomial `(r - 1)! / ∏ h'_i!`, evaluated as a
product of binomials. If it holds at least `k`, the answer's next letter is
`c` and the walk descends into its block; otherwise that whole block lies
before rank `k`, so `k` drops by the block's count and the next letter is
tried. Before the walk starts, the same multinomial over the full half
answers feasibility: fewer than `k` distinct arrangements means the empty
string.

The multinomials dwarf any fixed-width integer (`m!` for `m = 5000` has
~16 000 digits), but only comparisons against `k ≤ 10⁶` ever matter, so
every product is **capped at `k`**: each binomial factor is abandoned the
moment it reaches `k`, and the running product likewise. No intermediate
ever exceeds `k · n ≤ 10⁶ · 5000`, comfortably inside 64-bit range (and
below 2⁵³, so JavaScript doubles stay exact). The walk is iterative, and
the mirror half plus the odd middle letter are appended at the end.

**Complexity:** `O(26 · n · 26)` multinomial-factor work in practice — each
capped evaluation scans the at-most-26 letter counts with short binomial
loops, and rank subtractions bound the rejected-candidate work by `k` —
with `O(n)` space.
