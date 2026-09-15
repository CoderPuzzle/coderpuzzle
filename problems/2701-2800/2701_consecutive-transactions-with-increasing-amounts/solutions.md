# Solutions — Consecutive Transactions with Increasing Amounts

## Gaps-and-islands over daily streaks

Each customer's days must be cut into maximal periods where every adjacent
pair is both one calendar day apart and strictly rising in amount, so the
query first fetches each row's predecessor inside its customer: a `marked`
CTE applies two `LAG` window functions partitioned by `customer_id` and
ordered by `transaction_date`, exposing the previous day and amount. A row
continues its period exactly when its date equals `date(prev_date, '+1 day')`
and its amount exceeds `prev_amount`; otherwise it starts a new period. The
first day of every customer has a null predecessor whose comparisons fail,
which correctly seeds one new period per customer.

The second CTE turns those continue-or-break flags into a period key: a
running `SUM(... ) OVER (PARTITION BY customer_id ORDER BY transaction_date)`
of the break indicator (0 when continuing, 1 when breaking) is constant
within each maximal period and jumps across boundaries — the classic
gaps-and-islands grouping. The final query groups by `customer_id` and that
key, collapses each period to its `MIN`/`MAX` dates as `consecutive_start`
and `consecutive_end`, filters periods shorter than three days with
`HAVING COUNT(*) >= 3`, and orders by the three output columns, so runs of
four or more qualifying days yield one covering row rather than sub-windows.

Every step is one pass over data sorted per customer: the two `LAG`s share
one sort of `Transactions`, the running sum reuses that order, and the
grouping aggregates the intermediate once more, all bounded by period-count
output. With `n` transaction rows the whole pipeline is therefore dominated
by the initial per-customer sort.

**Complexity:** `O(n log n)` time, `O(n)` space.
