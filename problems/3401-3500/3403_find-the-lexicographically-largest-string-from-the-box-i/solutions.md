# Solutions — Find the Lexicographically Largest String From the Box I

The box ends up holding every piece of every distinct split of `word`
into `numFriends` non-empty parts, and the task is the largest of those
pieces. Enumerating splits is exponential, but two observations turn the
box's contents into something scannable: a length cap, and the fact that
the cap is the only constraint.

## Largest capped substring, one pass

A piece can hold at most `n - numFriends + 1` letters, because the other
`numFriends - 1` pieces need one letter each. Conversely — except when
`numFriends` is 1, where the box holds exactly the whole word — every
string of at most that length really does appear in the box: lay it at
any chosen start, and the remaining `n - length` letters always split
into the required `numFriends - 1` non-empty parts. So the answer is the
lexicographically largest substring of `word` whose length is at most
`n - numFriends + 1`, no enumeration needed.

That maximum is always achieved by a _right-maximal_ slice — a substring
running from its start to the cap or the end of the word — since a
substring is a prefix of its right-maximal extension and no prefix beats
its extension. Comparing the capped slice `word[i : i + limit]` for each
start `i` and keeping the largest therefore finds the answer in one
pass. At `n = 5000` that is up to 25 million character comparisons in
the tie-heavy all-equal worst case, comfortably inside the limits; the
working set is one slice at a time.

**Complexity:** `O(n²)` time worst case (each of `n` slices compared up
to `n - numFriends + 1` characters), `O(n)` space.
