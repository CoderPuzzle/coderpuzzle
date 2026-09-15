# Solutions — Number of Matching Subsequences

## Waiting buckets keyed by next needed character

Testing each word independently by scanning `s` is too slow when many words share the same text. Invert the work: stream `s` once, and for each character that arrives, advance every word that is currently waiting for exactly that character. Keep a dictionary mapping a letter to the list of `(word, index)` pairs whose next required character is that letter; each word sits in exactly one bucket.

Initialize the buckets from the words' first characters. When character `c` is processed, pop the bucket for `c` (popping, not peeking, ensures the same bucket position is not reprocessed) and re-file each entry: if the just-matched character completed the word, increment the match count; otherwise push `(word, index + 1)` into the bucket for the word's next character. Characters with an empty or absent bucket are skipped in constant time.

Correctness is just the greedy subsequence check distributed across words: a word matches `s` if and only if its letters can be consumed in order as `s` streams by, and each word's pointer only ever moves forward. Empty words are counted up front (defensive, since the constraints guarantee non-empty words). Every character of every word advances its pointer at most once, so the total work besides reading `s` is proportional to the combined length of the words.

**Complexity:** `O(|s| + sum of |words[i]|)` time, `O(|words|)` space (each word occupies one bucket entry at a time).
