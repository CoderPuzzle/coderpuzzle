# Solutions — Design In-Memory File System

## Directory Tree with Hash Children

A file system is a tree rooted at `/`, so the whole structure fits in one
recursive shape: every node holds a map from child name to child node. The
`FileSystem` class keeps only the root; each node distinguishes a directory
(empty content marker) from a file (its accumulated content), so files and
subdirectories share one namespace exactly as on a real disk.

Every method reduces to a walk. Splitting a path on `/` and dropping empty
pieces turns `/a/b/c/d` into the component list `a, b, c, d`; descending one
map lookup per component resolves the path in time linear in its length.
`mkdir` performs the same walk but inserts an empty directory node whenever a
component is missing — which also creates the middle directories. Writing a
file walks to the parent (guaranteed to exist), then appends to the file's
content buffer, creating the file on first write.

`ls` walks once and branches on the node kind: a file answers with its own
name, a directory with its children's names. The Python solution stores
children in plain dictionaries and sorts the names on the way out; the Java
solution uses a `TreeMap` so the children are kept sorted as they are
inserted and `keySet()` is already in lexicographic order. With at most 300
calls, paths of at most 100 characters, and 50-character content chunks, the
linear walks and sorted-name lists are nowhere near any limit.

**Complexity:** `O(P)` per `mkdir`/`addContentToFile`/`readContentFromFile`
for a path of `P` components; `ls` additionally costs `O(m log m)` to order
`m` children (`O(m)` with a sorted map); `O(N)` space for the tree.
