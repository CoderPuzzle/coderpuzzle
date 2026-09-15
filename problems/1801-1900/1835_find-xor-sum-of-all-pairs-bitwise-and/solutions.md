# Solutions — Find XOR Sum of All Pairs Bitwise AND

The naive answer XORs `n × m` terms — up to `10¹⁰` of them, far too many
to touch one by one. The escape is an algebraic identity: bitwise AND
distributes over XOR, `(a & b) ^ (a & c) = a & (b ^ c)`, because the
identity holds independently at every bit position (per bit it is just
`x·y ^ x·z = x·(y^z)` over {0, 1}).

## Fold each array to its XOR sum, then AND

Applying that identity repeatedly collapses the whole double sum. Grouping
the pairs by their `arr1` element,
`(arr1[i] & arr2[0]) ^ (arr1[i] & arr2[1]) ^ … = arr1[i] & xor(arr2)`, so
every row of the pair matrix reduces to a single AND against one running
value `y = arr2[0] ^ arr2[1] ^ …`. Folding once more with the same
identity across `i` gives
`xor(arr2) & (arr1[0] ^ arr1[1] ^ …) = xor(arr1) & xor(arr2)` — hint 3's
one-line answer. The work is two linear scans and one final AND.

No width concerns arise: inputs fit in 32 bits (`≤ 10⁹ < 2³⁰`) and XOR and
AND never widen a value, so every intermediate stays within 32 bits in
every language. The brute-force cross-check on thousands of small random
inputs confirms the identity end to end.

**Complexity:** `O(n + m)` time, `O(1)` space.
