# Solutions — Simplify Path

## Stack of surviving segments

Splitting the path on `'/'` hands the algorithm one candidate per directory: repeated and edge slashes become empty segments, `'.'` arrives as a segment of its own, and everything else is a name. A stack of names accumulates the directories the canonical path will keep, and one left-to-right scan applies the dot rules on the fly: `'..'` pops the most recent name, while `'.'` and the empty segments are skipped. Because the scan follows the path's own order, the stack always mirrors the directory chain the prefix has reached so far.

Popping from an empty stack is the root rule: `'..'` at the top level would climb above `'/'`, which the statement forbids, so it changes nothing — an empty stack already is the root. Every other dot run, `'...'` and `'....'` included, fails the exact-match tests for `'.'` and `'..'` and is pushed as an ordinary name. The canonical form then falls straight out of the stack: a leading `'/'` followed by the surviving names joined by single slashes, which yields exactly `'/'` when nothing survives.

**Complexity:** `O(n)` time and `O(n)` space, where `n` is the length of `path`.
