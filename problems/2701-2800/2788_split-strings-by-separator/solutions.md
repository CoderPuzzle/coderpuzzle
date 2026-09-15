# Solutions — Split Strings by Separator

## Cut at each separator and drop empty pieces

Walk `words` in order and cut every string at each occurrence of
`separator`. The scan yields the pieces between consecutive cut points
strictly left to right: a leading separator produces an empty first piece, a
trailing one an empty last piece, and two adjacent separators an empty piece
between them. Keeping only the non-empty pieces, appended as each word is
finished, builds the result in exactly the order the statement requires, and
`separator` itself can never appear because it is consumed as the cut point.

The empty-piece filter is what makes the tricky inputs collapse correctly.
Example 2's `"$easy$"` is really the three pieces `"", "easy", ""` around its
two `$` characters, so only `"easy"` survives. A word made entirely of
separators, such as Example 3's `"|||"`, contributes nothing but empty
pieces, which is why the answer can be genuinely empty — distinct from
containing empty strings, since those are precisely what gets dropped. A word
without any occurrence of `separator` stays one uncut piece and passes
through unchanged, and a one-character word equal to `separator` is dropped
like any other empty piece. With `N` the total number of characters across
`words`, every character is visited once.

**Complexity:** `O(N)` time, `O(N)` space.
