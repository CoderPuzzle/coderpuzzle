# Solutions — Reverse Words in a String II

## Reverse the whole string, then restore each word

Flipping the entire buffer once does two jobs at the same time: the words land in reverse
order, and every word's letters come out backwards. The letters are put right by flipping
each word a second time — a flip applied twice is the identity — while the word order,
which is what the problem asks to reverse, keeps the first flip's result. Every cell is
touched at most twice and nothing is ever moved out of order, only swapped in place.

Because the input is guaranteed free of leading and trailing spaces and separated by
exactly one space everywhere, finding the words needs no compaction at all: a word ends at
each separating space, and one more time at the end of the line. That is the one thing
this problem asks beyond its sibling — nothing, in fact: it asks less, since the buffer
never shrinks or shifts. The sibling `151` must also squeeze away runs of spaces while it
copies words forward; here every character stays exactly where the whole-reverse put it,
and only the interiors of words are flipped back.

C++ is the only language here whose strings are mutable, and its solution runs both flips
directly on `s` with `O(1)` extra space, as the statement demands. Every other language
hands out immutable strings, so each solution first copies the text into a mutable buffer
— a `char` list in Python, a `char[]` in Java, a byte slice in Go, a `Vec<char>` in Rust,
a char array in JavaScript and TypeScript — and runs the identical flips there. That
single copy is forced by the language; the flips themselves allocate nothing beyond it.
The returned string is that buffer joined, which is what the judge compares.

**Complexity:** `O(n)` time; `O(1)` extra space in C++, one forced copy elsewhere.
