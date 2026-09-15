# Solutions — Generalized Abbreviation

## Backtracking over count-or-letter choices

Every character of `word` faces the same fork: keep the letter, or fold it
into a running count of consecutive abbreviated characters. Two choices at
each of the `n` positions is exactly why the answer holds `2^n`
abbreviations — "word" alone yields sixteen. The recursion carries the
position, the prefix built so far, and that pending count, which silently
accumulates while characters are being abbreviated.

The count is the whole correctness story. It is flushed — appended as its
decimal length — only in two places: at the moment a letter is kept, and
once more when the scan passes the end of the word. A number therefore can
never sit next to another number, because a kept letter always separates
them; and "22de" is impossible for a second reason too — every position is
decided exactly once, so chosen substrings cannot overlap. The flush rule
is precisely the statement's non-overlapping, non-adjacent construction,
and the reverse reading holds as well: any abbreviation that satisfies the
rule corresponds to exactly one keep-or-count choice per position.

The emission order needs no post-sort. The search tries the abbreviate
branch before the keep branch, so the leaves come out in the canonical
order the statement pins: the first path abbreviated everything ("4" leads
for "word"), the last path kept everything (the bare word closes the list).
Each of the `2^n` abbreviations is built by one `O(n)` prefix extension.

**Complexity:** `O(2^n * n)` time, `O(n)` recursion depth plus the output
itself — `2^n` strings of up to `n` characters.
