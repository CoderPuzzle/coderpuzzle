# Solutions — Palindrome Permutation II

## Backtrack the left half, then mirror

A palindrome reads the same in both directions, so its left half determines
everything: the right half must be the mirror image of the left, and at most
one letter — the middle — may sit unpaired. Counting letters therefore
settles existence first: if two or more letters have an odd count, no
palindromic permutation exists and the answer is `[]`; otherwise the single
odd letter (or none, for even lengths) is the fixed middle, and each letter
keeps half its count for the left half.

The left half is a multiset, so the task is enumerating its distinct
permutations. The walk keeps one remaining-count bucket per distinct letter
and, at each depth, tries every non-empty bucket in ascending letter order:
take a copy, recurse, put it back. Choosing buckets rather than positions of
a materialized multiset is exactly what skips the duplicate branches — no
half can be built twice, so no deduplication pass is needed. The ascending
order also orders the output: earlier positions vary slowest, halves emerge
in ascending lexicographic order, and mirroring preserves that order because
equal-length palindromes first differ inside their left halves. No final sort.

Each completed half is emitted as `left + middle + reversed(left)`. Every
letter of `s` is placed exactly once per palindrome, and the walk's
bookkeeping is one shared buffer of depth `|s|/2`.

**Complexity:** `O(|s| · (|s|/2)!)` time, `O(|s|)` auxiliary space excluding
the output.
