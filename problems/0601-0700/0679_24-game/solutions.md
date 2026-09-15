# Solutions — 24 Game

## Backtracking over the multiset of values

The search space is tiny and closed, so the direct exhaustive search wins.
Every legal expression is a binary tree whose leaves are the four cards, and
any such tree evaluates bottom-up by combining two siblings into their parent
at each step. That observation collapses permutation, operator choice, and
parenthesization into one uniform move: take any unordered pair of the
remaining values, apply an operator, and recurse on the multiset with the pair
replaced by the result. Four values become three, three become two, and a
single leftover value decides the answer — no expression tree exists outside
this recursion, and none is visited twice.

Two operators are asymmetric, so `-` and `/` spawn both orders, `a-b` and
`b-a`, `a/b` and `b/a`; division additionally guards against a zero divisor.
Arithmetic runs on real-valued doubles because the winning expression often
travels through fractions no integer path reaches: the classic `[3,3,8,8]`
only lands on 24 as `8 / (3 - 8/3)`, whose inner value is `1/3`. That is also
why the leaf test is a tolerance, not equality — floating point cannot
represent such intermediates exactly, so a lone remaining value wins when it
sits within a small epsilon of 24.

The tree is bounded by the fixed input size: at most 6 pairs times 6
operations at the top level, 3 pairs below, 1 at the bottom — a few thousand
root-to-leaf paths in total, each of depth three, so the whole search is an
instant constant amount of work for any hand of cards.

**Complexity:** `O(1)` time, `O(1)` space — bounded by the fixed 4-card
search tree, a constant few thousand root-to-leaf paths.
