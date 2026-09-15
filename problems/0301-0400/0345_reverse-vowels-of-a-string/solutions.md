# Solutions — Reverse Vowels of a String

## Two pointers meeting from both ends

The first vowel has to end up where the last vowel was, the second where the
second-to-last was, and so on inward — so two pointers, one starting at each end,
produce exactly those pairings. Each pointer skips forward past characters that are
not vowels; the moment both sides sit on a vowel at once, those two swap and both
pointers step inward. Consonants are never written, which is why everything between
the vowels stays exactly in place.

Every iteration advances at least one pointer, so the scan always meets in the middle
after one pass over the text. The vowel set carries both cases — `a` and `A` count
equally — while `y` is deliberately absent from it, and characters like digits or
spaces are treated like any other non-vowel and simply skipped.

C++ is the only language here whose strings are mutable, and its solution runs the
scan directly on `s` with `O(1)` extra space. Every other language hands out
immutable strings, so each solution first copies the text into a mutable buffer — a
char list in Python, a `char[]` in Java, a byte slice in Go, a `Vec<char>` in Rust, a
char array in JavaScript and TypeScript — runs the identical scan there, and rebuilds
the string from it. That one copy is forced by the language; the scan itself
allocates nothing beyond it.

**Complexity:** `O(n)` time; `O(1)` extra space in C++, one forced `O(n)` buffer in
the other six languages.
