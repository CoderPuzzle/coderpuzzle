# Solutions — Decode the Message

## Substitution table from first appearances

One scan of `key` builds the whole cipher: walking left to right, every
letter not met before is assigned the next unused letter of the alphabet,
and repeats are skipped so a letter keeps the rank of its first appearance
only. Space is entered into the table up front mapping to itself, which
lets the translation step treat every character uniformly. The constraints
promise `key` contains all 26 letters, so after the scan the table is
complete and every letter `message` can contain has a mapping.

Decoding `message` is then one lookup per character: each letter is
replaced by its assigned alphabet letter and each space passes through
unchanged, preserving lengths and spacing exactly.

**Complexity:** `O(k + m)` time, `O(m)` space for the output, where `k` and
`m` are the lengths of `key` and `message`; the table itself holds a
constant 26 entries.
