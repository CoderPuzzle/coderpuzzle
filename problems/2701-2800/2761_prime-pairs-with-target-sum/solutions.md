# Solutions — Prime Pairs With Target Sum

## Sieve plus a half-range scan

The sieve of Eratosthenes first settles primality for every integer up to
`n` in one table: starting from 2, each surviving prime crosses off its
multiples, and since any composite has a factor at most its square root the
crossing-off can begin at `i * i`. After the sweep, a cell that was never
marked belongs to no smaller multiple's row — it is prime — so `isPrime[x]`
answers any membership question in constant time.

With the table in hand, the answer is a single scan over the smaller
endpoint. Every valid pair satisfies `x <= y`, which forces `x <= n / 2`,
and conversely any `x` up to there yields a partner `y = n - x >= x` — so
checking `isPrime[x]` and `isPrime[n - x]` for each `x` from 2 to `n / 2`
emits every pair exactly once. Scanning `x` in ascending order also produces
the required output order directly, with no sort at the end. The self-pair
`[p, p]` falls out naturally whenever `n` is even and `n / 2` is prime.

A few edge behaviors are worth seeing explicitly rather than special-casing.
The smallest prime pair is `[2, 2]` summing to 4, so every `n < 4` leaves
the list empty — the loop simply never runs. An odd sum needs one even
prime, so for odd `n` the only candidate is `[2, n - 2]`; the scan finds it
exactly when `n - 2` is prime (as in `n = 5 -> [[2,3]]`) and returns empty
otherwise (as in `n = 11`, where `9` is composite).

**Complexity:** `O(n log log n)` time, `O(n)` space.
