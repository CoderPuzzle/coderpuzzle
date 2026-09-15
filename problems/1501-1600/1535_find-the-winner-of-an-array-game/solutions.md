# Solutions — Find the Winner of an Array Game

## Running champion, single left-to-right pass

Actually shuffling the loser to the back of the array on every round would
cost `O(n)` per move and `O(n·k)` overall, which is far too slow once `k`
approaches `10^9`. The key observation is that the game is equivalent to
scanning `arr` once from left to right while keeping track of a "current
champion" — the largest value seen so far in the scan — and a streak
counter of how many values in a row it has beaten. Comparing the champion
against the next element and updating both in place reproduces exactly the
same sequence of wins the literal simulation would produce, without ever
touching the tail of the array.

The code initializes the champion to `arr[0]` and the streak to `0`, then
walks `arr[1:]`. Whenever the next value beats the champion, the champion is
replaced and the streak resets to `1`; otherwise the streak simply
increments. As soon as the streak reaches `k` the champion is returned
immediately — this also handles `k >= arr.length - 1` for free, since the
streak can never reach `k` before the scan reaches the true maximum, at
which point the streak keeps growing until the loop runs out of elements
and the maximum is returned regardless.

**Complexity:** `O(n)` time, `O(1)` space.
