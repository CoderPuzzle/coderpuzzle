# Solutions — Count Good Meals

A good meal is nothing more than a pair of items whose values sum to a power
of two, so the answer depends only on how often each value occurs — positions
matter solely to distinguish duplicate items. With values capped at `2²⁰`,
very few sums are even eligible, and counting pairs per eligible target is
the whole job.

## Counting pairs against each power of two

Two values sum to at most `2²⁰ + 2²⁰ = 2²¹`, so exactly the 22 powers `2⁰`
through `2²¹` can ever be a good meal's total — no other target needs
testing. Building a frequency map first, each distinct value `v` is set
against each power `p` through its mate `w = p - v`: when `w > v` the value
pair contributes `count(v) * count(w)` meals, and when `w == v` (the power
equals `2v` exactly) the items pair among themselves for `count(v)` choose
`2` — the statement's note that different indices count as different items
is precisely this term. Restricting the cross term to `w > v` visits every
unordered value pair once, so nothing is double counted.

On `deliciousness = [1,1,1,3,3,3,7]`: the 1s self-pair for `3 choose 2 = 3`
meals (sum 2), 1 with 3 gives `3 * 3 = 9` (sum 4), and 1 with 7 gives
`3 * 1 = 3` (sum 8) — 15 in total, the statement's second example. Zero
values are not inert either: `0 + 1 = 1 = 2⁰` is a good meal, the smallest
target of all.

The raw count reaches `n * (n - 1) / 2`, about `5 * 10⁹` at `n = 10⁵` — past
both the 32-bit range and the `10⁹ + 7` modulus — so the total is
accumulated in 64 bits (exact as a JavaScript number too, since every term
stays under `2⁵³`) and reduced modulo `10⁹ + 7` at the end.

**Complexity:** `O(n * 22)` time, `O(D)` space (D = distinct values).
