# Solutions — Check If Two String Arrays are Equivalent

## Two-Pointer Walk Over Both Concatenations

The obvious route is to build both concatenations and compare the results,
but the comparison never needs the materialized strings: it only ever looks
at one character from each side at a time. So each array gets a pair of
indices — which element it is on, and which character within that element —
and the two pairs advance in lockstep, one character per step, across both
arrays at once. The first time the two current characters differ, the
concatenations differ, and the answer is `false` without looking further.

The index bookkeeping is what replaces the string building. After each
comparison both offsets advance; an offset that reaches the end of its
element rolls over — its array index steps to the next element and the
offset resets to zero. Element boundaries therefore never have to line up
between the two arrays: `["ab", "c"]` and `["a", "bc"]` walk through `abc`
in different footstep patterns while visiting exactly the same characters.

The loop ends when either array is exhausted, and that ending carries the
last piece of information: the concatenations have equal length exactly
when both walks finish together, so an array with elements left over means
a strictly longer concatenation and the answer is `false`. The whole
computation touches each character at most once and keeps four integers —
no concatenated copy is ever built.

**Complexity:** `O(n)` time (total length), `O(1)` extra space.
