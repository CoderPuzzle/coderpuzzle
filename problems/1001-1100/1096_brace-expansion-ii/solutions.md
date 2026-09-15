# Solutions — Brace Expansion II

## Iterative stack machine over sets of words

The grammar has two operations with different precedences — concatenation
binds tighter than the comma union inside a group — so the expression is
evaluated with a stack that alternates between the two. A single scan
maintains `cur`, the set of words formed by the concatenation so far. On
a `{` the current `cur` is pushed as a saved prefix and a fresh, empty
"group slot" is pushed on top of it; a comma closes the current
alternative by folding `cur` into that group slot (the slot becomes the
union of the alternatives seen so far); a letter simply appends itself to
every word in `cur`. A `}` closes the group: the group slot is combined
with the final alternative, then the saved prefix is popped and the
group's union is concatenated with it, `{a + b}`, restoring a single
`cur` for whatever follows.

Working with sets throughout gives the deduplication the statement
demands — `{{a,b},{b,c}}` collapses to `{a,b,c}` automatically, since a
set holds each word once. Every brace, comma, and letter is visited
exactly once, and the intermediate word sets stay small because the
expression is at most `60` characters. The final set is sorted before
being returned.

**Complexity:** `O(W)` time and space for the word set, where `W` is the
number of distinct words the expression represents (bounded by the
product of the group sizes, itself limited by the 60-character
expression).
