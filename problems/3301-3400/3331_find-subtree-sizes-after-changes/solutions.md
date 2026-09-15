# Solutions — Find Subtree Sizes After Changes

## Last-seen DFS + reverse-preorder fold

The rewrites all happen at once and each node's new parent is its closest
same-letter ancestor in the original tree, so nothing about the final
structure depends on applying changes in order — only on resolving every
node against the original ancestry. One DFS from the root does exactly
that: it carries `last[c]`, the deepest node on the current root-to-v
path holding character c, and the node v meets either re-parents to
`last[s[v]]` or keeps its original parent. The traversal is an explicit
enter/exit stack — entering v pushes v's saved last-seen entry and the
exit visit pops it back — so `last[]` always describes the current path
and the whole pass is linear with no recursion (the crawl's `n ≤ 10⁵`
rules out recursive DFS on the stack-limited runtimes).

Sizing the final tree needs no second search. Every new parent is an
original ancestor of its child, hence appears earlier in the DFS
preorder; consuming the preorder in reverse therefore visits every child
before its parent, and folding `size[v]` into `size[newparent[v]]` in
that order accumulates all subtree sizes in a single linear pass.

**Complexity:** `O(n)` time, `O(n)` space.
