# Solutions — String Matching in an Array

## Pairwise substring test

A word belongs in the answer exactly when it appears inside some _other_
word, so the simplest correct plan is to check every pair: for each word
`words[i]`, scan the other words `words[j]` and report `words[i]` as soon
as one `words[j]` contains it. Because the strings are unique, the
substring test `words[j].contains(words[i])` can only succeed against a
strictly longer word, so no word witnesses itself.

The size bound makes this strategy comfortably fast: at most 100 words of
length at most 30. Each containment test runs in `O(L²)` worst case with
the naive matcher most languages' standard library uses (where `L <= 30`),
and there are at most `n²` pairs — a few tens of thousands of character
comparisons in the worst case, far below the limit. The answer is built by
appending each accepted word once, preserving a valid (though arbitrary)
order that the multiset comparison accepts.

**Complexity:** `O(n² · L²)` time for the pairwise scans with the small
`L <= 30` bound, `O(n)` space for the answer.
