# Solutions — Monthly Transactions II

## Two per-group tallies merged by full outer join

Approved totals and chargeback totals are counted independently, then merged on the `(month, country)` key. The approved branch filters `Transactions` to `state = 'approved'` and groups by `substr(trans_date, 1, 7)` and `country`. The chargeback branch joins `Chargebacks` back to `Transactions` on `trans_id` to recover each chargeback's country and amount, but groups by the **chargeback's** own `trans_date` month — a chargeback is reported in the month it was filed, which need not match the month of the original transaction.

Because a country-month can appear in either branch alone, the two tallies are combined with a full outer join, emulated in SQLite by two `LEFT JOIN`s (`approved` left-joined with `chargebacks`, unioned with the mirror image). `COALESCE` fills the missing side with zeros. Finally the all-zero rows the statement asks to ignore are filtered out, and the leftover rows are emitted in any order.

**Complexity:** `O(T log T + C log C)` time for the two grouped scans (plus the merge) and `O(T + C)` space, where `T` is the number of transactions and `C` the number of chargebacks.
