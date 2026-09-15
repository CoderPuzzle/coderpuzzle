# Solutions — Last Visited Integers

## Simulate the rules with a consecutive-minus-one counter

Walking nums once and keeping the two arrays the statement names is enough.
Every positive goes to the front of seen, and every -1 needs only one extra
piece of state: a counter k of consecutive -1s, incremented per -1 and reset
to zero by any positive, which is exactly what makes a positive between two
-1s break the run. When k fits inside seen, the k-th element from the front
is the k-th most recent positive — the last visited integer — so it is read
directly by index; otherwise seen has fewer than k positives in total and
-1 is recorded instead.

Reading by index rather than removing keeps seen intact for later -1s in
the same run: the third -1 after [2, 1] still asks for seen's third element
even though the first two -1s already reported those entries. The only cost
is the front insertion itself, which shifts every element already in seen —
at most n²/4 elementary moves over the whole pass, with n at most 100, far
inside the limits. Nothing can overflow: elements and answers are bounded
by 100 in absolute value.

**Complexity:** `O(n²)` time, `O(n)` space.
