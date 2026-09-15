# Solutions — Maximum Score From Removing Substrings

## Greedy Two-Pass Stack Removal

It is always optimal to remove all instances of the more valuable pattern first. Exchange argument: whenever an `ab` and a `ba` compete for overlapping characters (an `a` or `b` that could serve either pattern), taking the higher-priced one first can never lose points, because the leftover character still pairs with later matches of the other kind. So the code orders the two passes by comparing `x` and `y`, removing the higher-scoring pair type first and then sweeping the residue for the other type.

Each pass is a single left-to-right scan with a stack, the standard adjacent-pair-removal pattern: when the incoming character `c` equals `second` and the stack top equals `first`, the pair is removed — the top is popped and `points` are added; otherwise `c` is pushed. The characters that survive the scan are exactly the input after all non-overlapping removals of that pattern have been applied greedily, and joining them yields the string handed to the second pass.

After the first pass no occurrence of the first pattern remains, so the second pass over the leftover string extracts every remaining point from the other pattern. Characters other than `a` and `b` pass through both stacks untouched and never interact. Each character is pushed and popped at most once per pass, and the total score is just the sum of the two passes.

**Complexity:** `O(n)` time, `O(n)` space.
