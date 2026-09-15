# Solutions — Find if Digit Game Can Be Won

Every play available to Alice swallows an entire digit class at once — all
the single-digit numbers or all the double-digit numbers — and Bob silently
receives whatever she declines, so the whole game reduces to how the two
class sums compare.

## One pass over the two digit classes

Taking the singles wins exactly when their sum strictly beats the doubles'
sum, and taking the doubles wins exactly when the mirror inequality holds.
So a single streaming pass settles the game: walk `nums` once, adding each
value to a singles total or a doubles total according to how many digits it
has, then compare the two totals. Whichever total is larger names the play
that wins, because Bob is handed precisely the other class.

The only way neither play works is an exact tie. If the two totals are
equal, whichever class Alice leaves behind arrives with exactly her own
sum, so the required strict win is out of reach on both sides and the
answer is `false`. Nothing beyond the two running accumulators is kept,
and with `n <= 100` and `nums[i] <= 99` the sums stay below `10⁴`, well
inside every language's native integer range.

**Complexity:** `O(n)` time, `O(1)` space.
