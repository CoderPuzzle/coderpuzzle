# Solutions — Count the Number of Special Characters I

## Case-pair presence flags

A letter is special purely as a membership question: does its lowercase form
appear in `word`, and does its uppercase form? Order, adjacency, and counts
are all irrelevant. So one linear pass over `word` marks two 26-slot flag
arrays — one per case — and the answer is the number of indices where both
flags are set.

The flagged-pair view makes the guarantee immediate: only the 52 fixed
English letters can appear, so the flags fully summarize the input and no
other interaction between characters matters. The scan touches each of the
`n` characters once and each of the 26 letters once more at the end,
regardless of how mixed the cases are.

**Complexity:** `O(n)` time, `O(1)` space (two fixed 26-slot arrays).
