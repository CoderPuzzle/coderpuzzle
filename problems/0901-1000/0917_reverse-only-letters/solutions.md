# Solutions — Reverse Only Letters

Non-letters are pinned in place, so only the letters move — and the
letters alone come out in reverse order. The first letter belongs where
the last letter stood, the second where the second-to-last stood, and so
on inward: exactly the pairing two pointers, one starting at each end,
walk out directly.

## Two pointers swapping letters in place

Each pointer steps toward the middle past characters that are not English
letters; digits and punctuation are read and never written, which is what
keeps them at their indices. The moment both sides sit on a letter at
once, those two trade places and both pointers step inward, until the
pointers meet. On `a-bC-dEf-ghIj`, `j` lands in the first slot, `I` in the
third, and every hyphen stays where it was.

Every iteration advances at least one pointer, so the letters are all
paired after one pass over the text. The letter test is an explicit
two-range check, `a-z` and `A-Z` — the constraint alphabet is pure ASCII,
so comparing character codes is exact, and case travels with the
character: a slot that held lowercase keeps holding whatever case arrives.

Every language here except C++ hands out immutable strings, so each
solution first copies the text into a mutable buffer — a char list in
Python, a `char[]` in Java, a byte slice in Go, a `Vec<char>` in Rust, a
char array in JavaScript and TypeScript — runs the identical scan there,
and rebuilds the string from it. C++ runs the scan directly on `s`, since
its strings are mutable.

**Complexity:** `O(n)` time, `O(n)` space.
