# Solutions — Find Resultant Array After Removing Anagrams

## Sorted-signature scan

Two words are anagrams exactly when sorting their letters yields the same
string, so a word's sorted form acts as its signature. Under the deletion
process every removed word is an anagram of its current left neighbor, so
each maximal run of adjacent anagrams collapses onto its first word: that
first word is never deletable, while every later member of the run
eventually stands beside a kept word with the same signature and is removed.

One pass computes that fixed point directly. Remember the signature of the
last kept word, and keep the next word only when its signature differs.
Checking against the last kept word rather than the raw previous input is
what lets a single sweep replace the whole loop of operations — the previous
word may itself have been deleted, and the survivor it left behind is the
neighbor a candidate must actually clear.

**Complexity:** `O(n * L log L)` time, `O(L)` space.
