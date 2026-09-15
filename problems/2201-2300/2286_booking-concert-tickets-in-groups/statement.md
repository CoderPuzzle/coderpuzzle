# Booking Concert Tickets in Groups

## Description

A concert hall has `n` rows numbered from `0` to `n - 1`, each with `m` seats
numbered from `0` to `m - 1`. Design a ticketing system that can allocate
seats in the following cases:

- If a group of `k` spectators can sit together in a row.
- If every member of a group of `k` spectators can get a seat, though they
  may or may not sit together.

The spectators are very picky. Hence:

- They will book seats only if each member of their group can get a seat in
  a row with number less than or equal to `maxRow`. `maxRow` can vary from
  group to group.
- In case there are multiple rows to choose from, the row with the smallest
  number is chosen. If there are multiple seats to choose from in the same
  row, the seat with the smallest number is chosen.

Implement the `BookMyShow` class:

- `BookMyShow(int n, int m)` Initializes the object with `n` rows of `m`
  seats each.
- `int[] gather(int k, int maxRow)` Returns an array of length 2 denoting
  the row and seat number (respectively) of the first seat allocated to the
  `k` members of the group, who must sit together. In other words, it
  returns the smallest possible `r` and `c` such that all seats
  `[c, c + k - 1]` are valid and empty in row `r`, and `r <= maxRow`.
  Returns `[]` in case it is not possible to allocate seats to the group.
- `boolean scatter(int k, int maxRow)` Returns `true` if all `k` members of
  the group can be allocated seats in rows `0` to `maxRow`, who may or may
  not sit together. If the seats can be allocated, the `k` seats are
  allocated to the group with the smallest row numbers, and the smallest
  possible seat numbers in each row. Otherwise, returns `false`.

Both methods allocate seats when they succeed and never allocate when they
fail.

### Example 1

```text
Input:
["BookMyShow", "gather", "gather", "scatter", "scatter"]
[[2, 5], [4, 0], [2, 0], [5, 1], [5, 1]]
Output: [null, [0, 0], [], true, false]
Explanation:
BookMyShow bms = new BookMyShow(2, 5); // 2 rows with 5 seats each.
bms.gather(4, 0);   // return [0, 0] — the group books seats [0, 3] of row 0.
bms.gather(2, 0);   // return [] — only 1 seat is left in row 0, so two
                    // consecutive seats are impossible.
bms.scatter(5, 1);  // return true — the group books seat 4 of row 0 and
                    // seats [0, 3] of row 1.
bms.scatter(5, 1);  // return false — only one seat is left in the hall.
```

### Constraints

- `1 <= n <= 5 * 10⁴`
- `1 <= m, k <= 10⁹`
- `0 <= maxRow <= n - 1`
- At most `5 * 10⁴` calls in total will be made to `gather` and `scatter`.

### Follow-up

`gather` wants the first row in a prefix with a contiguous block of size
`k` free, and `scatter` wants to know whether a prefix has `k` free seats at
all — which two aggregate statistics cover both?

## Hints

### Hint 1

Seats in a row are always allocated as a contiguous block starting right
after the seats already taken there — so a row's entire state is one number,
its remaining seat count, and a `gather` in that row starts at seat
`m - remaining`.

### Hint 2

Over the array of remaining counts, `gather` asks for the first index in
`[0, maxRow]` whose value is at least `k`, and `scatter` first asks whether
the sum over `[0, maxRow]` reaches `k`. A segment tree storing both the max
and the sum of each range answers the two questions in logarithmic time.

### Hint 3

For `gather`, descend from the root preferring the left child whenever it
intersects the query prefix and its max is at least `k`, backtracking to the
right child when the left dead-ends. For `scatter`, once the sum check
passes, repeatedly locate the first row with a positive remainder and drain
it — each row is emptied at most once over the whole run, so the draining
amortizes.
