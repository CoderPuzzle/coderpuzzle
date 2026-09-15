# Solutions — Maximum Transactions Without Negative Balance

## Greedy scan with a max-heap of taken debits

Walk the sequence once, keeping the running `balance` of everything taken
so far plus a max-heap holding the magnitudes of the debits already taken.
A nonnegative transaction always goes in: it can only push the balance up,
and it adds one to the count being maximized. A negative transaction goes
in whenever it is affordable (`balance + t >= 0`, landing exactly on zero
included); taking an affordable debit can never hurt, because any plan
that skipped it stays available from a strictly richer state.

When a debit does not fit, the heap offers a repair instead of a plain
skip. If the largest debit taken earlier is strictly bigger than the
current one, refund that larger debit and take the current one: both
choices count as one transaction, but the balance ends higher by the size
difference, so every schedule that was reachable before is still reachable
and later, smaller debits now fit too. If no earlier debit is bigger — or
the heap is empty — nothing can be traded for the current debit without
losing count or balance, so it is skipped for good; dropping several
earlier debits to make room would only trade many counts for one.

Each of the `n` transactions triggers at most one heap push or one
push-and-pop, so the whole scan costs a logarithmic factor per element.
The balance itself needs care: with `n` up to `10⁵` transactions of up to
`10⁹` each, its running value reaches `10¹⁴`, far beyond 32-bit range, so
fixed-width languages accumulate it in 64-bit.

**Complexity:** `O(n log n)` time, `O(n)` space.
