# Solutions — Maximum Number of Words Found in Sentences

## Count separators in every sentence

Because every pair of adjacent words is separated by exactly one space and there are no leading or trailing spaces, a sentence's word count is its number of spaces plus one. Scan every character of every sentence, compute that count, and retain the maximum.

Only the running maximum and current count are needed; no words or split substrings have to be stored.

**Complexity:** `O(C)` time and `O(1)` auxiliary space, where `C` is the total number of characters.
