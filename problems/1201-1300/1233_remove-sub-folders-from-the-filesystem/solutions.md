# Solutions — Remove Sub-Folders from the Filesystem

## Sort, then keep what the last keeper does not prefix

Lexicographic order puts a parent immediately before all of its sub-folders:
`"/a"` precedes `"/a/b"`, and — because `'/'` sorts before every letter — a
path that shares only a partial segment, like `"/ab"` after `"/a"`, does
**not** come out as a false prefix candidate. Walking the sorted list once,
each folder is kept exactly when it is not a sub-folder of the most recently
kept one, which is the only folder it could belong to: everything kept
earlier is shorter in sort order and already excluded.

The sub-folder test is `candidate.startswith(kept + "/")` — appending the
slash is what separates a true child from a sibling sharing a name prefix
(`"/a/b"` matches `"/a" + "/"`, while `"/ab"` does not match `"/a/"`).

Every kept folder therefore starts a fresh prefix family, and all of its
descendants are skipped in the same pass.

**Complexity:** `O(n log n * L)` time for the sort (`L` the path length cap,
since comparisons cost up to `L`), `O(n * L)` space for the sorted copy.
