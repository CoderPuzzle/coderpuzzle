# Solutions — Brace Expansion

## Parse into option groups and backtrack over the choices

A word is formed by picking, position by position, either the single
letter or one of the letters inside a brace group. The string is first
parsed into a list of groups, where a bare letter becomes a one-element
group and `"{a,b,c}"` becomes the list `["a", "b", "c"]`; the statement
guarantees there are no nested braces, so a single left-to-right scan
with `s.index('}', i)` is enough to find each group. After parsing, a
recursive walk over the groups appends one option at a time, collecting
every complete word when the last group is reached.

The words are generated in the order the options appear, which is not
necessarily lexicographical — a group like `"{b,a}"` would emit `"b"`
before `"a"`. The problem requires the final list sorted, so the
generated words are sorted once before returning. The recursion depth is
the number of groups, at most the string length of `50`, and the total
number of words is the product of the group sizes, which stays small
under the length bound.

**Complexity:** `O(W log W)` time and `O(W · L)` space for the result,
where `W` is the number of generated words and `L` is the word length
(the sort dominates; the product of group sizes is bounded by the
constraints).
