# Solutions — Remove Duplicates From an Unsorted Linked List

The list is unsorted, so "is this value repeated?" cannot be answered
locally the way it can in a sorted list — a value's duplicates may sit any
distance apart. The fix is to learn the multiplicity of every value before
touching the list: count how many times each value occurs in one pass
(hint 2), then a second pass knows exactly which nodes survive.

## Count values in a hash map, keep count == 1

Pass one walks the list and tallies each `node.val` in a hash map. Pass
two walks again, splicing every node whose count is exactly `1` onto the
result; nodes with count above 1 are simply skipped, so all copies of a
repeated value disappear at once. A dummy head anchors the result list,
which turns "the real head gets deleted" (example 2) into no special case:
the first kept node attaches to the dummy either way, and whatever the
dummy points to is returned. Because pass two reuses the existing nodes
and relinks them in order, no new allocation per survivor is needed, and
`tail.next = None` after the loop cleanly terminates the result.

Both passes are linear and the map holds one entry per distinct value, so
the whole algorithm is linear time with space bounded by the number of
distinct values (at most the list length, here `10⁵`). The two-pass shape
also sidesteps recursion entirely — nothing on this path can overflow the
stack at depth `10⁵`.

**Complexity:** `O(n)` time, `O(n)` space for the value counts.
