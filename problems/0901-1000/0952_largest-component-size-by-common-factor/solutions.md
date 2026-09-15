# Solutions — Largest Component Size by Common Factor

## Union-find over prime factors

Two values sit in one component exactly when a chain of shared factors
links them, and a common factor greater than 1 always contains a prime:
values `a` and `b` share an edge iff they share a prime, so components
are connectivity through primes, and composite factors never add an edge
a prime would not. A value of 1 shares nothing and always stands alone.

Rather than testing all pairs, the solution runs a smallest-prime-factor
sieve up to the largest value `V`, which factorizes any number in the
array in a handful of divisions: peel `spf[x]`, divide it out, repeat. An
iterative union-find with path halving and union-by-size is keyed by
factor — every value unions with each of its distinct primes — so two
values land in one class exactly when a chain of primes joins them, and
counting class members over the values (never over the primes
themselves) yields the largest component.

The sieve is the dominant cost; afterwards each of the `n` values does
at most six unions — a number below 10⁵ has at most six distinct prime
factors — and one find per value for the tally.

**Complexity:** `O(V log log V + n·log V·α)` time, `O(V)` space.
