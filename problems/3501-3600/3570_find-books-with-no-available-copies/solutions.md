# Solutions — Find Books with No Available Copies

## Inner join on open loans, exact-exhaustion filter

A book qualifies only if two things hold at once: at least one lending of
it is still open (`return_date IS NULL`), and the number of open lendings
equals every copy the library owns — that is what "zero copies available"
means, since available = `total_copies` minus open lendings. The inner
join to `borrowing_records` restricted by `return_date IS NULL` supplies
the first condition for free: a book with no open loan produces no joined
rows at all and drops out, which also rules out the never-borrowed and
fully-returned books even when their shelves happen to be empty.

Grouping by the book's columns collapses each book's open loans into one
row, and `COUNT(br.record_id)` becomes the required `current_borrowers`
column. The `HAVING` clause keeps exactly the books where that count
equals `total_copies` — books with copies still on the shelf fail it. The
outer `ORDER BY` presents the survivors by descending borrower count and
then ascending title, matching the required output order.

**Complexity:** `O(B + R log B)` for `B` books and `R` borrowing records
(join plus the grouping aggregate), `O(B)` space for the grouped rows.
