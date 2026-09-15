# Solutions — Redistribute Characters to Make All Strings Equal

Moving characters between strings can rearrange letters arbitrarily, so
the actual positions never matter — only whether the pooled multiset of
characters splits into equal shares.

## Count totals and test divisibility

Count every occurrence of each letter across all words combined. The
operation preserves the global multiset, and `n` equal final strings
need every letter's total count to be a multiple of `n`; conversely,
when it is, dealing each letter round-robin constructs the equal
strings. Return whether all 26 counts divide evenly.

**Complexity:** `O(T)` time for `T` total characters, `O(1)` extra
space (26 counters).
