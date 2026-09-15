# Solutions — Number of Valid Words in a Sentence

## Validate each token

Split the sentence on whitespace and scan each nonempty token once. Letters are always allowed. A hyphen is allowed only once and only when the characters immediately before and after it are lowercase letters; punctuation is allowed only once and only as the token's final character. A digit or any other character rejects the token immediately.

Count every token that finishes the scan without violating a rule. Ignoring empty split artifacts handles repeated spaces as well as leading and trailing spaces without treating them as words.

**Complexity:** `O(|sentence|)` time and `O(|sentence|)` space for tokenization.
