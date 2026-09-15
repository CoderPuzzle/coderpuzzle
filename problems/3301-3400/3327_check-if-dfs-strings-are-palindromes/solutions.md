# Solutions — Check if DFS Strings Are Palindromes

## Postorder tour + Manacher

Running the described dfs once from the root writes every node's character
to dfsStr in postorder, and a subtree is always a contiguous block of that
sequence: dfs(x) emits the whole subtree of each child before appending
s[x], so the subtree of node i occupies exactly the segment of length
size[i] ending at i's own position pos[i] in the tour. A single traversal
therefore reduces all n queries to "is tour[pos[i] - size[i] + 1 ..
pos[i]] a palindrome?" — no per-node dfs re-runs are needed.

Manacher's algorithm computes the maximal palindrome radius at every
center of the tour in one linear pass over its '#' interleaving, and a
segment [l, r] is a palindrome exactly when the radius at its transformed
center l + r + 1 covers its full length. Each node's answer is then a
single comparison against size[i]. The traversal is an explicit stack
(children in decreasing order, whose reverse is the required postorder —
children increasing, node last), so nothing recurses and the whole
pipeline stays linear in the length of the string.

**Complexity:** `O(n)` time, `O(n)` space.
