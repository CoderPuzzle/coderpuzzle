# Solutions — Count the Number of Vowel Strings in Range

## Direct Range Scan

A word in `words` counts exactly when its first and last characters are
both vowels; nothing about its interior or length matters (a one-letter
vowel satisfies both ends at once). The answer is therefore a single scan
of indices `[left, right]`, testing two endpoints per word against a
five-element vowel set and counting hits.

Because the check touches only `word[0]` and `word[word.length − 1]`,
each test is constant time regardless of word content, and the loop runs
at most 1000 iterations under the constraints. The running count stays
below `words.length ≤ 1000`, so no arithmetic overflows anywhere.
Words outside the range are never even inspected.

**Complexity:** `O(right − left)` time with `O(1)` endpoint checks per
word, `O(1)` extra space.
