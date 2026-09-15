# Solutions — Longest Absolute File Path

## Depth stack, one pass

Every line of `input` names one file or directory, and the tabs in front of
it give its depth. The lines of a valid file system arrive in an order where
a name at depth `d` always extends the most recent entry at depth `d - 1`, so
the whole tree reduces to one array indexed by depth: slot `d` holds the
absolute-path length of the latest entry seen at that depth. When a name
arrives, its path length is the parent's stored length plus one `'/'`
separator plus the length of the name itself — the root level, having no
parent, contributes no separator.

Slot `d` is then overwritten with that length, which is the entire stack
discipline: descending a level pushes a new slot, while a sibling at the same
depth replaces the old value because its ancestor chain is identical up to
the parent. Directories update their slot but never join the answer — files
are exactly the names containing a dot, and each of those candidates updates
the maximum. When the input holds no dotted name at all, the maximum stays
at `0`.

Splitting on `'\n'` and counting leading `'\t'` visits each character a
constant number of times, and the array never grows past the deepest chain in
the system.

**Complexity:** `O(n)` time, `O(d)` space, where `d` is the maximum depth.
