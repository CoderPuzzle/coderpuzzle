# Solutions — Design HashSet

## Bucketed Array

The set lives in a fixed array of 769 buckets, and the hash function is the
key itself reduced modulo 769: `add` computes the bucket, scans its short
list, and appends the key only when it is not already there — so a duplicate
`add` changes nothing. `remove` scans the same list and deletes the key only
when it finds it, which makes removing an absent key a no-op, and `contains`
answers with that one scan and nothing else. No bucket ever holds keys that
hash elsewhere, so every operation looks at exactly one bucket.

769 is prime: a divisor pattern or a stride in the key stream (keys 1, 770,
1539, … all hash to bucket 1) still spreads across buckets once the stride is
coprime to 769, and a stride that is not — a collision — is exactly the case
the short list absorbs. With at most `10⁴` calls the largest possible bucket
holds at most that many keys, and expected occupancy per bucket is
`n / 769`.

**Complexity:** `O(n/B)` time per operation, with `n` keys stored and `B =
769` buckets; `O(n + B)` space.
