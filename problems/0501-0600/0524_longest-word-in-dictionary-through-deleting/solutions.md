# Solutions — Longest Word in Dictionary through Deleting

## Greedy subsequence test, best-so-far fold

Deleting characters from `s` can only leave a subsequence of `s`, so a
dictionary word is formable exactly when it is a subsequence. Test each word
with the two-pointer walk: scan `s` once and advance a pointer into the word
every time the scanned character equals the one under the pointer. Matching
each character at its earliest legal position is safe — pulling a later match
up to the greedy spot only leaves more room for what follows — so the word
forms precisely when the pointer runs off its end. Words longer than `s`
simply never get there.

The answer folds over the dictionary with one comparison per surviving
candidate: a formable word wins when it is longer than the best so far, or of
equal length and lexicographically smaller. Seeding the best with the empty
string makes the no-candidate case fall out as `""`, and because the rule is a
pure minimum over `(length, word)` pairs, the winner does not depend on the
order the words arrive in — duplicates and late winners need no special
handling. Sorting the dictionary by `(-length, word)` and returning the first
formable entry computes the same minimum, at the cost of ordering words the
scan would have rejected anyway.

**Complexity:** `O(D * (|s| + L))` time — `D` dictionary words each checked
against `s` in one pass — and `O(1)` extra space beyond the input.
