# Solutions — Build an Array With Stack Operations

## Stream simulation with a target set

The stream delivers `1, 2, 3, ...` in order, and `target` is strictly
increasing, so the only numbers worth keeping are the members of `target`
— every skipped value arrives before the next wanted one and must be
pushed then popped immediately. Holding `target`'s values in a set turns
each stream value's decision into one membership test.

The loop reads the stream value by value, appending `"Push"` always and a
following `"Pop"` when the value is unwanted, and stops the moment the
stream's value equals `target`'s last element: at that point the stack
holds exactly `target` and the rules forbid reading further. Because
`target[i] <= n`, the loop always terminates within `n` iterations.

The length of the answer is `2 · target[-1] - len(target)`: every value
up to the last contributes one `Push`, and each discarded value adds one
`Pop`. That matches the replay in the examples, including the early stop
for `[1,2]` with `n = 4`.

**Complexity:** `O(t)` time where `t = target[-1]` stream values read,
`O(t)` space for the operation list.
