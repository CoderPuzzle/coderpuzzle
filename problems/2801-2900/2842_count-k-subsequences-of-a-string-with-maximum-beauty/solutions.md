# Solutions — Count K-Subsequences of a String With Maximum Beauty

## Frequency-group greedy with binomial choice and modular powers

A k-subsequence picks each of its `k` characters once, and picking character
`c` can happen in exactly `f(c)` ways (its index positions in `s`), so a fixed
set of `k` distinct characters contributes `∏ f(c)` different subsequences.
The beauty of such a set depends only on which frequencies enter it, hence the
maximum beauty is achieved precisely by taking the `k` largest frequency
values among the distinct letters. If `s` holds fewer than `k` distinct
letters no k-subsequence exists and the answer is 0. Otherwise sort those
frequencies in descending order; equal-frequency letters are interchangeable,
so they form groups walked from largest value downward — whole groups are
consumed until the remaining demand falls inside some group, splitting it.

Within that walk, taking `i` letters from a group of size `c` sharing
frequency `x` contributes `C(c, i)` character sets times `x^i` index-choice
multipliers, which matches hint 4's `cnt[x]Ci * xi`. All arithmetic runs
modulo 10⁹ + 7: products are reduced at every step, `x^i` comes from fast
modular exponentiation, and the required binomials are tiny because at most
26 letters exist, so their running values never exceed C(26, 13) = 10400600.
Only the single split group asks for a nontrivial binomial, which is what
makes the answer sensitive to ties exactly where the statement intends it.

Counting the letter frequencies is a single pass over `s`; every later step
touches at most the 26 nonzero counts. The returned residue always lies below
the modulus, well inside signed 32-bit range.

**Complexity:** `O(n)` time, `O(1)` space.
