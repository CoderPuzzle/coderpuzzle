# Solutions — Verify Preorder Serialization of a Binary Tree

## Slot counting, one pass

Think of the string as a stream of tokens, each claiming one tree position.
Exactly one position is open before the first token — the root's. Every token,
number or `'#'`, claims one open position; a number then opens two more, for
its children, while a `'#'` opens none. A serialization is correct exactly
when this accounting balances: no token may arrive once nothing is open (the
tree it describes was already finished), and the last token must close the
final position (nothing may be left dangling for a null to fill).

The scan holds that single count, `slots`, starting at 1. Each token first
checks the count is nonzero, spends one slot, and adds two back when the token
is a number; a zero before the end is an early `false`, a nonzero after the
end is the trailing one. Because only whether a token is `'#'` matters — never
which number it is — the string can be read in place, one token up to each
comma, with no token list and no tree, which the statement forbids building
anyway.

**Complexity:** `O(n)` time, `O(1)` space.
