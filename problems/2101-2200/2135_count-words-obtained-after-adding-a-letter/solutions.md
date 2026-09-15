# Solutions — Count Words Obtained After Adding a Letter

## 26-Bit Letter Masks with Hash Set Lookup

Because no letter repeats within any word, a word is fully described by the 26-bit mask of letters it contains, and the append-plus-rearrange operation becomes a pure set operation: a target is obtainable exactly when its mask equals some start word's mask plus one extra bit. Order, and the position the letter is appended to, are irrelevant after rearranging — only the letter sets matter.

The solution builds a hash set of the start-word masks once. For each target word it computes the mask, then tries deleting each of the 26 possible bits; if the resulting mask (with that bit cleared) is present in the set, the target is counted and the bit loop breaks early. Deleting one bit from the target is the inverse of appending one letter, so this check is exact — no false positives (mask must match a real start word) and no false negatives (every obtainable target has exactly one bit more than its source).

Note that a target with the same mask as a start word does not count, since exactly one letter must be appended; the loop naturally handles this because it only tests masks with one bit removed. With S start words and T target words of length at most 26, mask construction is linear in total characters and each target probes the set at most 26 times.

**Complexity:** `O(26·(S + T))` time, `O(S)` space.
