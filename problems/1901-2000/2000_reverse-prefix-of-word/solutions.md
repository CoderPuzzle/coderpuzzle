# Solutions — Reverse Prefix of Word

## Reverse the segment up to the first occurrence of `ch`

The operation is fully determined by one fact: the index `i` of the
first occurrence of `ch`. Every character before `i` stays where it is,
the prefix `word[0..i]` is reversed, and the suffix `word[i+1..]` is
appended unchanged. So the whole algorithm is a locate-and-flip in two
steps:

1. Find `i` with the language's substring search (`find` / `indexOf`).
   If `ch` never appears, return `word` as-is — no reversal happens.
2. Reverse the prefix and concatenate the untouched suffix.

The prefix is non-empty whenever `i >= 0`, and a prefix of length one
(e.g. `ch` at index `0`) reverses to itself, so the single code path
covers `i == 0` with no special case. Because `word` consists of
lowercase English letters, every character is a single byte, which lets
fixed-width languages reverse the prefix in place over the raw bytes.

**Complexity:** `O(n)` time (the reversal touches at most `n/2`
characters and the search scans at most `n`), `O(n)` space for the
resulting string.
