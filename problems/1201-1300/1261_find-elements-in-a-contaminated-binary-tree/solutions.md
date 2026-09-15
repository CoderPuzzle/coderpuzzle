# Solutions — Find Elements in a Contaminated Binary Tree

## Recover once, then answer from the bit path

The recovery rule fixes each node's value from its position alone: a left
child is `2x + 1` (binary: append `1`), a right child is `2x + 2` (append
`0`... in value terms, `2x + 2`). Read backwards, the bits of `target + 1`
above the leading one are exactly the moves from the root — so membership of
`target` can be decided by walking that bit path down the _contaminated_ tree,
no recovery pass and no hash set needed.

The constructor only has to normalize the root to `0`. Each `find(target)`
strips the top bit of `target + 1`, then consumes the remaining bits highest
first: bit `1` descends to the left child, bit `0` to the right; running off
a missing child means the value is absent. At most `21` steps per query.

**Complexity:** construction `O(1)` beyond the input; each `find` runs in
`O(height)` time and `O(1)` space.
