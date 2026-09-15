# Solutions — Reverse Words in a String III

## Reverse each word with two pointers

The constraints do the heavy lifting: words are separated by single spaces and
the string carries no leading or trailing space, so a word runs from one
separator to the next and every boundary is unambiguous. One left-to-right scan
finds each word, and a pair of pointers — one at each end of the word — swaps
its way inward until they meet, reversing exactly that word. The separators are
never touched, which is why the whitespace and the word order come through the
pass unchanged.

Each character is read a constant number of times: once to locate the word
boundaries, and at most once more as part of a swap that settles two positions
at a time. Nothing is split into a list of words and stitched back together —
the words are reversed where they sit, so the whole sentence needs a single
pass and no auxiliary structure beyond the reversal itself.

C++ is the only language here whose strings are mutable, and its solution runs
the scan directly on `s` with `O(1)` extra space. Every other language hands
out immutable strings, so each solution first copies the text into a mutable
buffer — a char list in Python, a `char[]` in Java, a byte slice in Go, a
`Vec<char>` in Rust, a char array in JavaScript and TypeScript — runs the
identical scan there, and rebuilds the string from it. That one copy is forced
by the language; the scan itself allocates nothing beyond it.

**Complexity:** `O(n)` time, `O(n)` output space.
