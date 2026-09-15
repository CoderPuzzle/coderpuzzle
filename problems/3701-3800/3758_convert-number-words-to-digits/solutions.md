# Solutions — Convert Number Words to Digits

Both approaches are the same left-to-right greedy scan; they differ only in
how a position's question is answered: "does a number word start here?" The
scan itself is forced by the statement — take the word when one starts at
the current position, advance one character otherwise — and since no digit
word is a prefix of another, at most one word can start anywhere, so the
walk never faces an ambiguity. Every skipped character is dead weight that
can never be recovered, which is why neither approach ever needs lookahead
or backtracking.

## Direct word comparisons

The vocabulary is fixed and tiny, so each position can be settled with plain
slicing. Keep the ten words indexed by their digit, walk an index `i` from
the front of `s`, and test the slices `s[i:i+3]`, `s[i:i+4]`, and
`s[i:i+5]` against the words of those lengths — three probes cover all ten
words because the lengths are only 3, 4, and 5. A hit appends its digit and
jumps `i` past the word; a miss advances `i` by exactly one.

The constant factors are as small as they look: at most fifteen character
comparisons per position (three slices of at most five characters), so even
the constraint ceiling of 10⁵ characters costs about a million and a half
comparisons in the worst case of an answer-free string. Building the result
is a list of captured digits joined once at the end, never repeated string
concatenation, and nothing else is allocated but the slices themselves.

**Complexity:** `O(n · W)` time with `W <= 15` characters probed per
position, `O(k)` space for the `k` extracted digits beyond the output.

## Trie

A trie makes the same question cheaper per position and scales to any
vocabulary. All ten words share one tree: each node owns children keyed by
letter plus the digit whose word ends there, empty at non-terminal nodes.
At position `i`, walk down from the root following `s[i], s[i+1], ...`
while a matching child exists; every node along the way that carries a
terminal digit would have been a match ending at that depth. Because no
word is a prefix of another, at most one terminal sits on the whole path,
so the walk either finds it or reports no word after at most five steps.

Each character participates in at most two walks: the successful one that
consumes it as part of a matched word, and the single-step probe from the
position just before a mismatch kills its walk. That bounds total trie work
at `O(n · D)` steps with `D = 5` the deepest word, comfortably linear.
The tree itself holds only the distinct prefixes of ten short words — a
fixed handful of nodes regardless of input size.

**Complexity:** `O(n · D)` time with `D = 5` the longest word length,
`O(D)` space for the fixed trie plus `O(k)` for the output digits.
