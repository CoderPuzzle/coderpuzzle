# Solutions — Longest Palindrome by Concatenating Two Letter Words

## Pair each word with its reverse

Keep counts of words that have not yet been paired. For each word, use one waiting copy of its reverse when possible; the two words contribute four characters. Otherwise, save the word for a future reverse.

After all pairs are formed, one unpaired word with two equal letters may occupy the center and contribute two more characters.

**Complexity:** `O(n)` time and `O(1)` auxiliary space because there are only 676 possible words.
