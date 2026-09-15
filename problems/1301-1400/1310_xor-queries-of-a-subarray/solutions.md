# Solutions — XOR Queries of a Subarray

## Prefix XOR

XOR is its own inverse (`x ^ x = 0`, `x ^ 0 = x`), which makes it cancel like a telescoping sum. Building `prefix[t]` = XOR of the first `t` elements (with `prefix[0] = 0`), the XOR of the range `[l, r]` is `prefix[r+1] ^ prefix[l]`: every element before index l appears in both operands and annihilates itself, leaving exactly `arr[l] ^ ... ^ arr[r]`.

The implementation is one pass to fill the prefix array, then one constant-time lookup and XOR per query. This replaces the naive O(n) re-XOR per query with O(1), which matters at the constraint limits (up to 3 · 10^4 elements and as many queries).

There are no edge subtleties: single-element queries (l == r) reduce to `prefix[r+1] ^ prefix[r]` = `arr[r]`, the full-array query is `prefix[n] ^ prefix[0]` = the whole XOR, and all values being positive changes nothing since XOR never overflows any fixed bound.

**Complexity:** `O(n + q)` time, `O(n)` space, where `q` is the number of queries.
