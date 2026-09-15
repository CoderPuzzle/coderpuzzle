# Solutions — Find Maximum Number of String Pairs

## Hash set of previously seen words

Scan the array once, carrying a hash set of the words seen so far. For each
word, first ask whether its reversal is already in the set: if it is, that
earlier word and the current one form a valid pair, because the earlier index
precedes the current one. Only after the lookup does the current word join the
set, so a word is never available as its own partner — which is also why
palindromic words such as `"cc"` or Example 3's `"aa"` can never be paired at
all: pairing a palindrome would require an identical copy of it earlier in the
array, and the words are distinct.

This greedy count is the maximum, not merely some matching. A word has only
one possible partner, its exact reversal, and since all words are distinct that
partner occurs at most once — so no two potential pairs ever compete for the
same word. Every pair the scan takes can therefore be taken simultaneously,
and the number of hits equals exactly the number of complementary pairs
present in `words`.

**Complexity:** `O(n)` time, `O(n)` space.
