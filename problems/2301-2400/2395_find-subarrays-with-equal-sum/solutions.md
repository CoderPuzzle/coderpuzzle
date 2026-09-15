# Solutions — Find Subarrays With Equal Sum

## Hash set of adjacent-pair sums

Only the n−1 windows of length 2 matter. Sweep once, adding each window
sum to a hash set; the first sum already present answers true, and a
finished sweep without collision answers false. Position identity is
handled for free: equal sums at different indices collide in the set,
while identical content is never compared.

**Complexity:** `O(n)` time, `O(n)` space.
