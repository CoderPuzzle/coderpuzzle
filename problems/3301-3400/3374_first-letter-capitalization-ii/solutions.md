# Solutions — First Letter Capitalization II

## Walk the text once, capitalizing letters that follow non-letters

The hyphen rule collapses into the plain rule once "word" means any
maximal run of English letters: capitalizing a letter exactly when the
preceding character is not a letter handles both sides of every
hyphenated token, leaves `@`, `/`, `^`, `,`, `\`, and spaces untouched,
and lowercases everything mid-run. The query realizes this as one pass
of a tiny state machine per row. A recursive CTE `walk` carries the
original text, the prefix built so far, and a `prev_alpha` flag; at each
position it tests the current character against `[a-zA-Z]` with `GLOB`
and appends either its uppercase form (previous character was not a
letter) or its lowercase form (mid-word). Non-letters are appended
verbatim — which preserves spacing and every special character at its
exact position and count — and reset the flag.

Each chain terminates after consuming its text; the single completed row
per `content_id`, selected at `pos = LENGTH(txt) + 1`, pairs the
untouched original with the rebuilt `converted_text`. Empty strings end
at their seed row directly. Constant work per character, no regexes, no
reassembly aggregates; the comparison treats the result as an unordered
multiset keyed by the unique `content_id`.

**Complexity:** `O(total characters)` time, `O(longest text)` recursion
depth per row.
