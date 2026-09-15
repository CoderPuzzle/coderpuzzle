# Solutions — Maximum Subarray Sum with One Deletion

## Kadane with a One-Deletion State

Extend Kadane's algorithm with a second, parallel running state. `no_del` is the classic quantity — the maximum sum of a subarray ending at the current index with no element deleted. `one_del` is the same but with exactly one element deleted somewhere inside; the overall answer is the best value either state ever reaches, since a valid choice may or may not use the deletion.

At each new element `arr[i]`, the one-deletion state has two origins: either the deletion already happened earlier, and the subarray simply extends through `arr[i]` (`one_del + arr[i]`), or the deletion happens exactly now — drop `arr[i]` from the no-deletion subarray ending just before it (`no_del`, before it is updated). The no-deletion state updates as usual, restarting whenever a fresh element beats any extension (`max(no_del + arr[i], arr[i])`). Computing `one_del` first matters: it must read the previous `no_del`, not the one already extended by `arr[i]`.

The deletion is never wasted or harmful: `best` takes the max over both states, so an all-negative array simply reports the best single element via `no_del`, and the single-element input is returned up front because a lone element cannot be deleted. The `one_del = -infinity` seed forces a real first move rather than a phantom deletion of nothing.

One left-to-right pass with two rolling integers covers 10^5 elements.

**Complexity:** `O(n)` time, `O(1)` space.
