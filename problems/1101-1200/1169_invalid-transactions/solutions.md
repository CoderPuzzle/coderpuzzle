# Solutions — Invalid Transactions

## Parse Once, Compare All Pairs

Every verdict a transaction can receive is decided by one of two questions:
is its own amount over 1000, and does some other transaction share its name
while sitting within 60 minutes of it in a different city. The first
question is local; the second needs a partner found before any answer is
final — so a transaction that looked clean can be convicted by a later one,
and the result cannot be built in a single streaming pass.

The direct route parses each string into its four fields once, then runs
one all-pairs scan: transaction `i` is flagged when its amount exceeds the
limit, or when some `j` with the same name, a different city, and a time
difference of at most 60 minutes exists. With at most 1000 transactions the
scan is at most a million cheap integer comparisons — well inside budget —
and no auxiliary structure beyond the parsed arrays is needed. A small
shortcut keeps the inner loop honest: an amount already over 1000 flags the
transaction immediately without searching for partners.

**Complexity:** parsing is `O(n · L)` for string length `L`; the pairwise
scan is `O(n²)` time overall, `O(n)` extra space for the parsed fields and
flags.
