# Solutions — Count Pairs With XOR in a Range

## Binary trie with subtree counts

The range condition is split into two threshold counts: the answer is the number of pairs with XOR at most `high` minus the number with XOR at most `low - 1`, so all the real work lives in a helper that counts pairs with XOR at most a bound `k`.

That helper streams the numbers through a binary trie over a fixed 16-bit width (every value is below `2^16` given the constraints). Numbers are inserted one at a time, and each number is queried against the trie of everything inserted before it, so every unordered pair is counted exactly once. Every trie node stores the count of numbers passing through it, which is what lets a query price out whole subtrees in one step.

The query walks the bits from the most significant down, maintaining the invariant that the XOR of `x` with everything below the current node still matches the prefix of `k`. When `k`'s bit is 1, the entire subtree in the direction equal to `x`'s bit produces XOR bit 0 — strictly smaller than `k` at this position, so all of those numbers are counted at once via the stored count, and the walk continues into the opposite child, where the prefix still ties with `k`. When `k`'s bit is 0, only the same-bit child can keep the XOR prefix equal to `k`'s, so the walk simply descends there. After the final bit, whatever node remains is counted too, capturing XOR exactly equal to `k`.

With the bit width `B` fixed at 16, each insert and each query touches at most `B` nodes. The subtraction at the end handles `low = 1` correctly (`low - 1 = 0` still counts the pairs whose XOR is 0, i.e. duplicate values, and those must be excluded).

**Complexity:** `O(nB)` time, `O(nB)` space.
