# Solutions — Eat Pizzas!

Only the parity of a day matters, and every day burns four pizzas to bank one
of them, so the whole plan reduces to deciding — over the sorted weights —
which pizzas become the banked ones. An odd day banks its maximum, so it
wants to spend three small pizzas to escort one big one; an even day banks its
second-largest, so it wants two small escorts and a big pizza that overshadows
the banked one.

## Sort, then spend from the top, odd days first

With `d = n / 4` days there are `ceil(d / 2)` odd days, and those go first:
each banks the current global maximum, so together they claim the top
`ceil(d / 2)` weights of the sorted array — any other assignment leaves a
strictly smaller pizza banked on an odd day and can only lose. The even days
then work through the next weights in pairs: an even day banks the second
largest of its four, so pairing the remaining top weights consecutively
(largest with second largest, and so on) banks every second weight of that
block, which an exchange argument shows is the best any pairing can do. Small
pizzas are never scarce — each day consumes at most three of them and there
are always at least three small pizzas per day left over.

The code sorts ascending and walks a single top index: the first loop banks
`pizzas[top]` once per odd day, the second loop steps over the larger pizza of
each even-day pair and banks the one beneath it. The total reaches
`5 × 10⁴` days × `10⁵` = `5 × 10⁹`, past 32-bit range, so the accumulator is
64-bit (`long` / `long long` / `int64` / `i64`); in JavaScript it stays a plain
`Number`, exact because every partial sum is far below `2⁵³`.

**Complexity:** `O(n log n)` time for the sort, `O(1)` extra space (sorting in
place, `O(n)` where the platform's sort requires it).
