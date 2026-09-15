# Solutions — Maximum Prime Difference

## First and Last Prime Indices

The maximum distance between any two prime-bearing indices is always
`last - first`, where `first` and `last` are the earliest and latest indices
whose value is prime: extending the index range can only help, so the two
extremes are an optimal pair (and when a single prime exists, the extremes
coincide and give 0, matching the "not necessarily different" wording).
One forward scan therefore suffices — remember the first prime index once,
overwrite the last one on every further prime, and subtract at the end.

Primality testing stays trivial because values are capped at 100: trial
division probes divisors only up to the square root of each value, which for
this range means at most 9 probes. Values below 2 (just the value 1 here)
are rejected up front since they have no proper divisor structure of a prime.
The whole array is touched a constant number of times per element, with no
extra memory beyond the two trackers.

**Complexity:** `O(n · sqrt(V))` time with `V <= 100` (so `O(n)` overall),
`O(1)` space.
