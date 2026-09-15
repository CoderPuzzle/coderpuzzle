# Consecutive Available Seats

## Description

Table: `Cinema`

| Column Name | Type |
| ----------- | ---- |
| seat_id     | int  |
| free        | bool |

seat_id is an auto-increment column of this table. Each row indicates
whether the corresponding seat is free: 1 means free while 0 means
occupied.

Two seats are consecutive when their seat_id values differ by exactly 1.
Write a solution to report every seat that belongs to a stretch of at
least two consecutive free seats — that is, every free seat that has at
least one consecutive seat which is also free. A free seat whose
consecutive seats are all occupied (or have no row at all) does not count
on its own.

Return the result table ordered by seat_id in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Cinema`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input: Cinema table from the dataset below.
Output:
seat_id
3
4
5
Explanation: seats 3, 4, and 5 form a stretch of three consecutive free
seats, so all three are reported. Seat 1 is free, but its only
consecutive seat, seat 2, is occupied, so seat 1 is not part of any
stretch of consecutive free seats.
```

Write your solution as a single `SELECT` query returning one column —
`seat_id` — with one row per qualifying seat.

## Hints

### Hint 1

Consecutive is a claim about seat_id values, not about row order: seats
4 and 6 are not consecutive even when seat 5 has no row, and rows may
also arrive in any insert order — a neighbor counts only when its id is
exactly one away from the current seat's.

### Hint 2

ORDER BY seat_id inside a window definition turns the table into a
stream in which each seat's two consecutive-seat candidates are the
previous and next rows: LAG(seat_id) and LEAD(seat_id) carry their ids,
and LAG(free) and LEAD(free) carry whether each is free.

### Hint 3

A seat qualifies when it is free and at least one of those two window
neighbors is both id-adjacent (LAG(seat_id) = seat_id - 1, or
LEAD(seat_id) = seat_id + 1) and free; that predicate is exactly
"belongs to a stretch of two or more", so a lone free seat never
survives while every member of a longer stretch does.
