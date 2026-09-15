# Solutions — Maximum Binary String After Change

Both rules only ever shuffle zeros: `"10" -> "01"` slides a zero one seat
left across a `'1'`, and `"00" -> "10"` fuses an adjacent pair of zeros
into their right seat. The puzzle is therefore entirely about where the
zeros can end up, and that question has an exact closed-form answer.

## Herd the zeros into one seat

Neither rule can create a zero, and `"00" -> "10"` still leaves one zero
of its pair behind, so a string that starts with at least one zero can
never become all ones — the best it can aim for is exactly one zero, as
the hint observes. Getting there is mechanical: take the two leftmost
zeros, slide the second one left — every seat between them holds a `'1'`,
so `"10" -> "01"` applies repeatedly — until it sits beside the first,
then fuse the pair into their right seat. Each fusion consumes the zero
on the left and keeps the one on the right, so the survivor moves one
seat right per fusion; after herding all `z` zeros into the first one,
the lone survivor sits at index `first + z - 1`, where `first` is the
index of the initial first zero.

That seat is also the best anyone can do. Consider the sum of the
leftmost zero's index and the number of zeros: sliding a zero left never
raises the leftmost index, and a fusion buys at most `+1` on that index
by paying `-1` on the count, so the sum never exceeds its starting value
`first + z`. A string reduced to a single zero therefore parks it at
index at most `first + z - 1`, and any string still holding two or more
zeros keeps a zero at or left of `first + z - 2` — the herded string,
all `'1'`s with a single `'0'` at exactly `first + z - 1`, beats every
other reachable string. Strings with at most one zero have nothing to
fuse, and the only move left to them slides their lone zero left, which
only shrinks the value — they are already maximal and are returned
unchanged.

**Complexity:** `O(n)` time, `O(n)` space (output).
