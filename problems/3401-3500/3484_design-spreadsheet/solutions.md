# Solutions — Design Spreadsheet

The three operations never compound: formulas read two operands and sum
them, with no cell ever storing another formula. So the whole class
reduces to storing cell values and decoding one tiny operand grammar.

## Cell-keyed hash map with operand classification

A hash map from the cell reference string to its current value carries
all state — the constructor's `rows` count only bounds which references
are legal, so it never needs to be stored. Unset cells read as 0 through
a defaulting lookup, which is also why `resetCell` writes 0 instead of
deleting the key: a reset cell and a never-set cell must behave
identically, and both do.

`getValue` drops the leading `=` of the formula, splits on `+`, and
classifies each operand by its first character: a capital letter means a
cell reference (map lookup, 0 when absent), anything else is a
non-negative integer literal to parse. The classification is total — the
statement guarantees every operand is one of exactly these two shapes —
and the largest possible sum, `10⁵ + 10⁵`, fits every integer width with
room to spare. Each call does constant work: one or two hash lookups or
one short parse.

**Complexity:** `O(1)` time and `O(1)` space per call, `O(n)` space after
`n` `setCell` calls on distinct cells.
