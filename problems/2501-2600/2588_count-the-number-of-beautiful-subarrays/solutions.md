# Solutions — Count the Number of Beautiful Subarrays

## Prefix XOR Hash Count

The operation subtracts the same power of two from a pair of numbers that both have that bit set — in other words, it clears one set bit in each of two elements, preserving the total count of set bits at every position. Therefore the XOR of the whole subarray is invariant under any sequence of operations, and a subarray can be reduced to all zeros (XOR 0) if and only if its XOR is already 0. "Beautiful" is precisely "XOR of elements equals 0".

Counting zero-XOR subarrays is the classic prefix trick: with `x` the running XOR of elements seen so far (the XOR of `nums[0..i]`), the subarray `(j, i]` has XOR `prefix[j] ^ prefix[i]`, which vanishes exactly when the two prefixes are equal. So while sweeping, a hash map `count` records how often each prefix value has occurred (seeded with `count[0] = 1` for the empty prefix before any element); at each step the number of previously seen equal prefixes is exactly the number of beautiful subarrays ending here, and the current prefix is then recorded for later steps.

The seeding with the empty prefix is what counts subarrays starting at index 0 — a prefix equal to 0 at position `i` pairs with the seed to witness that the whole leading segment XORs to zero. Values up to 10^6 mean prefixes span at most 20 bits, keeping the map small and lookups O(1) on average; an all-zero array yields every one of its `n(n+1)/2` subarrays, which the 64-bit-friendly Python integers handle without overflow concerns.

**Complexity:** `O(n)` time, `O(n)` space.
