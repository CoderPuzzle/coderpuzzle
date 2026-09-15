# Solutions — Find Duplicate File in System

## Hash map keyed by content

Each directory info string is its own small parse: the single-blank-space
tokens are the directory path followed by one `name(content)` token per file.
A token's name is everything before its first `'('`, its content everything
between that parenthesis and the token's last `')'` — a content never holds a
space, because the space-separated tokenization could not carry one — so each
file contributes the full path `directory/name` to a bucket keyed by its
content, appended in scan order.

A content with two or more files is a duplicate group; a bucket holding one
file never reaches the output. The buckets already keep their paths in scan
order, so the only remaining choice is the order of the groups themselves, and
sorting the contents in descending lexicographic order emits exactly the order
the statement pins — the order Example 1 shows.

Every character of the input is read once and every returned path is stored
once, so with `N` the total length of `paths` the pass does `O(N)` work and
the map holds `O(N)` path characters — the size of the answer itself, which no
algorithm can avoid.

**Complexity:** `O(N)` time, `O(N)` space.
