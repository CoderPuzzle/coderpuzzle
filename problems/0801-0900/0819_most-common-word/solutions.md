# Solutions — Most Common Word

Everything the answer depends on is visible in one left-to-right read of
`paragraph`: a word is a maximal run of English letters, every other
character cuts, matching is case-insensitive, and the answer comes out in
lowercase. The banned list only removes words from contention, so the whole
task is a single scan that folds each letter as it arrives, closes each word
at its first non-letter, counts the survivors, and keeps the running
champion. With `P` characters in the paragraph, `B` total characters across
`banned`, and `W` distinct words, nothing more is needed.

## Scan, Count, Keep the Champion

Sweep the paragraph once carrying a word buffer. Each character folds by
arithmetic — ASCII places every uppercase letter 32 codes above its
lowercase twin, so one range check plus 32 lowercases it — and joins the
buffer; any character outside both letter ranges ends the word instead, so
punctuation never enters a token and an apostrophe cuts a contraction into
its two letter runs, "don't" counting as "don" and "t". The paragraph never
ends with a separator, so one trailing separator of our own closes the last
word and the loop needs no separate flush.

Every closed word is lowercase already, which is what makes the banned set
direct: `banned` arrives in lowercase, so a plain set answers containment
without any folding, and case differences like "Bob" versus "bob" never
smuggle a banned word past the check. Each survivor increments its hash map
counter, and a running champion pair — best word, best count — updates only
on a strictly greater count, so the first word to reach a count keeps it on
equals. The statement guarantees a non-banned word exists and that the
answer is unique, so no tie can ever reach that comparison: the champion
the sweep ends with is exactly the unique most frequent non-banned word.

**Complexity:** `O(P + B)` time, `O(W)` space.
