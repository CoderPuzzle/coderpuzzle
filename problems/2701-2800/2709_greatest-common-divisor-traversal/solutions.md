# Solutions — Greatest Common Divisor Traversal

## Smallest-Prime-Factor Sieve with Union-Find

Traversal is possible exactly between indices sharing a prime factor, so all indices are mutually reachable iff they all land in one union-find component. Linking every pair directly is quadratic, but each prime only needs to act as a hub chaining its indices together: unioning each index with the _previous_ index that shared one of its primes preserves connectivity with linearly many unions, because consecutive links along the chain make all indices of a prime mutually connected.

Factorization must be fast for up to `10^5` values, so the code sieves smallest prime factors up to `max(nums)` once. Splitting any value into its distinct primes then takes repeated SPF divisions — each step strips at least one prime factor, so a value decomposes in `O(log value)` steps — with an inner loop dividing out repeated powers so each prime is recorded once. A `last[prime]` dictionary remembers the most recent index claiming each prime; each new index unions against those predecessors before taking ownership.

Two edge cases precede the machinery: a single index is trivially connected, and any occurrence of the value 1 immediately returns false because 1 has no prime factors and can never share an edge with anything. A final pass checks that every index resolves to the same root. Writing `V = max(nums)`, the sieve is `O(V log log V)` and the union-find phase is `O(n log V)` plus near-constant amortized find costs.

**Complexity:** `O(V log log V + n log V)` time, `O(V + n)` space.
