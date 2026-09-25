# Solutions — Minimum Remove to Make Valid Parentheses

## An index stack of unmatched opens

Scan once, keeping a stack of the indices of `'('` that still hope for a
partner. A `')'` either pops the most recent such index — the pair is matched
and both survive — or arrives at an empty stack, marking itself unmatched and
doomed. When the scan ends, whatever indices remain on the stack are opens
that never found a close; together with the earlier orphans they form exactly
the removal set.

![Scanning lee(t(c)o)de), the index stack grows to [3, 5], both closes pop
their opens, and the final ) at index 12 lands on an empty stack — removing
index 12 alone leaves lee(t(c)o)de.](figures/solution-index-stack-doomed-close.svg)

Building the output is then a filter: keep every character whose index is in
neither doomed set. Both sets are decided before any character is dropped, so
each removal is independent and the total is minimal — every removed
parenthesis is provably unmatchable, and every kept parenthesis is provably
matched.

The stack never holds more than the open parens in flight, and letters pass
through untouched.

**Complexity:** `O(n)` time, `O(n)` space for the stack and removal marks.
