# Solutions — Find Common Characters

Every string's letter frequencies fit a length-26 array, and a character
that survives into the answer must occur at least once in _every_ word —
its final count is the minimum across all of those arrays, position by
position. Folding the words in one at a time with an element-wise minimum
leaves, after the last word, exactly the multiset that is common to all of
them; reading the surviving array off from `'a'` to `'z'` produces the
answer already in the ascending order the judge expects.

## One shared frequency array, folded by minimum

Start from the first word's 26-length letter-count array, then fold in each
remaining word by replacing every position with the smaller of the running
count and that word's count at the same position — a letter absent from
any single word is pinned to zero from that point on and stays zero.
Once every word has been folded in, each surviving position `i` holds the
number of times `chr(i)` belongs to the answer; walking the array from `a`
to `z` and repeating each surviving character that many times builds the
result directly in alphabetical order, with no separate sort needed.

**Complexity:** `O(C)` time, `O(1)` space, where `C` is the total number of
characters across `words` (the 26-slot frequency arrays are constant
size).
