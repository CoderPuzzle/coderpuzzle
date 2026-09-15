# Solutions — GCD Sort of an Array

## Smallest Prime Factor Sieve with Union-Find

Swapping is transitive in a useful way: if two numbers share a prime factor they can be swapped directly, and chains of such swaps let any element reach any other element whose prime set intersects its own connected component. Formally, build a graph whose nodes are the array values plus every prime up to `10^5`, connect each value to each of its prime factors, and take connected components with a union-find structure — any two values in the same component can be permuted into each other's positions through intermediate primes.

Factorization is made cheap by a linear-pass sieve that precomputes the smallest prime factor `spf[v]` of every `v` up to the sieve bound `M = 100001`; each array element then splits into its distinct primes by repeated division in a handful of steps. A disjoint-set forest with path halving answers the connectivity queries almost constant-time amortized. Note the union-find is indexed by _value_, not position, which automatically shares components between equal or related values appearing at multiple positions.

Once components are built, the array can be sorted if and only if, for every position, the original element and the target (sorted) element belong to the same component — each pair would then be exchangeable through some chain of gcd-greater-than-one swaps, and conversely a position whose two values sit in different components is immovable to its required place. Elements equal at a position trivially share a component with themselves.

**Complexity:** `O(M log log M + n log n)` time, `O(M)` space.
