# Solutions — Counter II

## Closure object with a frozen reset anchor

`createCounter` returns an object literal whose three arrow methods close
over exactly two captured slots: `count`, the mutable current value, and
`init`, the constructor argument that must stay untouched forever. Every
method mutates or reads `count` and hands back the new value in the same
expression — postfix-free forms like `++count` keep the
"change first, then report" ordering atomic, which is precisely what the
statement asks each call to do.

The only subtle piece is `reset`: it both rewinds `count` back to the
original seed and returns it. If the implementation stored the reset target
in a variable that later calls could clobber — say by writing into `init`
itself — a subsequent `reset()` would restore the wrong value and every
later answer would drift. Keeping `init` frozen in the closure and deriving
all mutations from the separate `count` slot makes repeated resets idempotent:
two resets in a row both correctly yield the original number. Because each
method does constant work on captured primitives, replaying a schedule of
`k` calls costs linear total time for constant live state.

**Complexity:** `O(1)` time per call, `O(1)` space.
