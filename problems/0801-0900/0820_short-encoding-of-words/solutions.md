# Solutions — Short Encoding of Words

## Suffix-discard set

A word occupies its own slot in the reference string unless another word already ends with it — "me" costs nothing extra once "time" is present, because the encoding of "time" contains "me" followed by `#`. So the shortest encoding is achieved by keeping exactly the words that are not a proper suffix of any other word, each contributing `len(word) + 1` characters (the word plus its terminating `#`).

The implementation starts from a set of all words and, for each word `w`, discards every proper suffix `w[k:]` for `k` in `1..len(w)-1`. Working on a set makes the removal independent of input order and collapses duplicate words automatically: two identical words are a suffix of each other's presence in the set only once, so duplicates share a single slot rather than disappearing entirely — the first copy remains because `w[k:]` only ever removes strict suffixes, never `w` itself.

What survives the discarding pass is precisely the set of words no other word ends with, so summing `len + 1` over the survivors yields the answer. With word lengths capped at 7, the quadratic-in-length suffix enumeration is tiny in practice.

**Complexity:** `O(N · L^2)` time, `O(N · L)` space, for `N` words of maximum length `L`.
