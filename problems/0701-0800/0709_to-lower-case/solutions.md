# Solutions — To Lower Case

Printable ASCII is a fixed 95-byte menu, and the uppercase letters form one
contiguous run inside it, so the conversion needs no tables and no library
calls: classify each character against that run, shift the ones inside it,
and pass everything else through. That single pass of byte arithmetic is
the whole problem — the original challenge pointedly steers away from the
built-in lowercase call, and this is the mechanism underneath it.

## Shift `A`–`Z` down by 32

The ASCII codes for `'A'` through `'Z'` run from 65 to 90, and the lowercase
letters start at `'a'` with code 97. Every uppercase letter's lowercase twin
sits exactly 32 codes higher — `'a' - 'A'` is 32 — so membership in 65..90
is the complete uppercase test, and adding 32 is the complete conversion.
The range check is not an optimization; it is what makes the shift safe.
A digit like `'0'` at 48, a backtick at 96, or an already-lowercase letter
has no twin to find, and every byte outside the run is copied verbatim.

The implementation is one pass building the output buffer: per character,
test the range, add 32 inside it, append, and finally join. Each language
does this in its own byte idiom — a list of characters in Python, a `char`
array in Java, an in-place byte slice in Go and Rust, code-unit arithmetic
through `charCodeAt`/`fromCharCode` in JavaScript and TypeScript — but the
per-character decision is identical everywhere.

The constraints guarantee printable ASCII, so byte-wise iteration never
splits a multi-byte character, and the length bound of 100 keeps the buffer
trivial. Inputs that are already lowercase or contain no letters at all
come back unchanged — every one of their bytes falls outside 65..90 and is
appended untouched.

**Complexity:** `O(n)` time, `O(n)` space.
