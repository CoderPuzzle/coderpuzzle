# Solutions — Largest Even Number

## Keep the prefix through the last '2'

Every admissible result is a subsequence of `s` that ends in '2' — a string
ending in '1' is odd no matter what precedes it. Because the digits are only
'1' and '2', never '0', a longer candidate always represents a bigger number
than a shorter one (both start with a nonzero digit), and among candidates of
equal length the ordinary left-to-right order decides. So the optimum keeps
as many characters as possible while still ending on an even digit: it is
exactly the whole prefix of `s` up through its last occurrence of '2'.

Deleting anything before that last '2' would only shorten or shrink the
number, and deleting any part of that prefix while keeping the rest of it
would produce a strictly smaller value; deleting characters after it cannot
help because they must all go anyway for the result to end in '2'. If `s`
contains no '2' at all, every nonempty subsequence ends in '1', nothing even
exists, and the answer is the empty string.

One backward scan finds the last '2'; one slice produces the answer. Both
cost at most `n` character operations, and the scan is branch-light — there
is nothing to trade off against it.

**Complexity:** `O(n)` time, `O(n)` space.
