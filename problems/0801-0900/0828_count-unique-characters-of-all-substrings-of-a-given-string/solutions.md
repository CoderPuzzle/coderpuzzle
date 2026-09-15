# Solutions — Count Unique Characters of All Substrings of a Given String

## Contribution per occurrence

Summing `countUniqueChars` over all substrings is too slow directly, so the sum is reorganized per character occurrence: a letter at position `i` adds 1 to `countUniqueChars(t)` exactly for those substrings `t` in which it appears precisely once. That happens exactly when the substring's left endpoint lies after the previous occurrence of that letter (or at 0) and its right endpoint lies before the next occurrence (or at `n - 1`).

If the previous equal character sits at `p` and the next at `q`, there are `i - p` choices for the left endpoint and `q - i` for the right, so the occurrence contributes `(i - p) * (q - i)` to the total. Summing this over every occurrence of every letter counts each (substring, unique character) pair exactly once, which by definition is the requested sum.

The code first buckets the indices of each of the 26 letters in one scan, then pads each bucket with the sentinels `-1` and `n` so the first and last occurrences need no special cases, and finally accumulates the products along each bucket. Repeated letters are what make contributions shrink — in "ABA" the two A's sit next to each other in the bucket, limiting both of their windows — while a letter that appears once contributes its full rectangle of substrings.

**Complexity:** `O(n)` time, `O(n)` space.
