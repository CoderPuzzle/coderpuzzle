# Solutions — Count Occurrences in Text

## Padded substring match per word

Whether 'bull' occurs as a standalone word is entirely a question of its
two neighbors: a space must stand immediately before the 'b' and
immediately after the final 'l'. Concatenating a space onto each end,
`' ' || content || ' '`, gives even the first and last word of a file
that outer neighbor and collapses the whole rule into one fixed
substring probe — does the padded text contain `' bull '`? GLOB with the
pattern `'* bull *'` answers it, and GLOB, unlike LIKE, is
case-sensitive, so `'Bull'` is rightly rejected. The decoys all fail
mechanically: 'bullet' and 'bears' have a letter welded to the word,
'bull.' has a period where the trailing space must be, and '"bull"' or
'(bull)' have punctuation crowding either boundary — while 'a bear
market.' passes because only the neighbors around 'bear' matter.

Each word is tallied independently: the rows of `Files` surviving the
probe feed `COUNT(*)`, and since one row is one file the count is files,
never raw occurrences — a draft saying 'bull' five times adds 1. Because
each tally is computed unconditionally, a word occurring in no file
still yields its row with 0 instead of vanishing, and `UNION ALL`
stacks the 'bull' row and the 'bear' row into the two-row answer whose
order the judge ignores.

The query scans `Files` once per word, reading every content string a
constant number of times: linear in the total size of the corpus, `C`
characters across both scans, with nothing retained beyond the two
running counts.

**Complexity:** `O(C)` time, `O(1)` auxiliary space.
