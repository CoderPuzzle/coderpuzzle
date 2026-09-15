# Solutions — Design HashMap

## Prime Bucket Array

The map is a fixed array of 1009 buckets, and each bucket is a small list of
`(key, value)` pairs. A key's remainder modulo 1009 picks its bucket, and that
is the only place any operation ever looks: `put` scans the bucket for a pair
carrying the key and replaces its value in place when it finds one, appending
a fresh pair when it does not — so an overwrite updates the one existing pair
rather than adding a second. `get` returns the value of the pair it finds, or
`-1` when its scan falls off the end of the bucket, and `remove` deletes the
pair when the scan finds it, doing nothing when the key was never there. 1009
is prime, so families of keys that repeat modulo some small number — runs of
consecutive integers, keys spaced a round 1000 apart — spread across distinct
buckets instead of piling into a few.

Every operation is a linear scan of one bucket, and a bucket holds only the
live keys that share a remainder. With `n` pairs spread over `B = 1009`
buckets by a hash that scatters keys roughly evenly, the expected bucket
length is `n / B`, so each scan touches a few pairs in practice. The array is
never resized and the map never rehashes — the fixed bucket count simply
trades a guarantee of `O(1)` worst-case lookups for a short, predictable walk
per call, which the stated call volume makes an easy bargain.

**Complexity:** `O(n/B)` time per operation, `O(n)` space.
