# Solutions — Reverse Words in a String

## Reverse the whole string, then restore each word

Flipping the entire string once does two jobs at the same time: the words come out in
reverse order, and every word's letters come out backwards. That is what lets one
compacting sweep finish the job — it only has to put the letters of each word back the
right way round while it copies them forward.

A read pointer skips each run of spaces and stops on a word; a write pointer marks
where that word is compacted to. Between two words exactly one space is emitted, never
one before the first, so leading, trailing, and repeated spaces all disappear simply by
never being copied. Each word is copied letter by letter — still reversed — into its
compacted slot and then flipped back with a two-pointer swap. The write pointer can
never overtake the read pointer, since it advances at most once per read advance, so
the sweep safely overwrites the already-consumed part of the same buffer, and the
answer is the buffer truncated to the write mark.

C++ is the only language here whose strings are mutable, and its solution runs the
sweep directly on `s` with `O(1)` extra space, as the follow-up asks. Every other
language hands out immutable strings, so each solution first copies the text into a
mutable buffer — a `char` list in Python, a `char[]` in Java, a byte slice in Go, a
`Vec<char>` in Rust, a char array in JavaScript and TypeScript — and runs the identical
sweep there. That single copy is forced by the language; the sweep itself allocates
nothing beyond it.

**Complexity:** `O(n)` time; `O(1)` extra space in C++, one forced copy elsewhere.
