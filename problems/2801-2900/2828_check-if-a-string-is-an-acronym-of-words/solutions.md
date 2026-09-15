# Solutions — Check if a String Is an Acronym of Words

## Join first characters and compare

The acronym is defined by an explicit recipe: read `words` from left to
right, keep only each word's first character, and concatenate those
characters in order. Executing the recipe literally settles the question —
collect one leading character per word into a fresh buffer, then compare the
buffer with `s` using ordinary string equality.

The equality check does all the remaining work. If `words` holds more strings
than `s` has characters, or fewer, the buffers differ in length and compare
unequal; when the lengths agree but some position differs — including the
case of repeated initials, where example 2's words really do spell "aa"
against the shorter "a" — the comparison still answers false. No guard is
needed for reading a word's first position: every word has at least one
character.

With at most 100 words, each at most 10 characters and `s` at most 100
characters, collecting initials is one pass over `words` and the final
comparison scans at most 100 characters. The collected acronym needs one
stored character per word.

**Complexity:** `O(n + m)` time, `O(n)` space, where `n = words.length` and
`m = s.length`.
