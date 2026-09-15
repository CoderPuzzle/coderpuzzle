# Solutions — Minimum Number of K Consecutive Bit Flips

## Greedy scan with a flip-parity hint array

The leftmost `0` forces the first move: any flip that fixes it must cover its position, and every flip covering it also touches positions to its left that are already `1`, so the only choice is a flip starting exactly there. After that flip, the same argument applies at the next position — a left-to-right scan that flips whenever the current effective bit is `0` is not merely greedy, it is forced, which makes it optimal (and any position where a forced flip would run past the array's end proves the task impossible).

Naively flipping `k` cells per step is too slow, so the code tracks parity instead. `flip` holds the XOR of all flips whose windows currently cover index `i`. When a flip starts at `i`, it should stop applying at `i + k`; that retirement is pre-scheduled by setting `hint[i + k] ^= 1`, and entering each position begins with `flip ^= hint[i]` to fold in exactly the flips expiring there. The effective bit is then `nums[i] ^ flip`.

When the effective bit is `0`, the code checks bounds first: `i + k > n` means the forced window falls off the array and it returns `-1`. Otherwise it counts the flip, activates it immediately with `flip ^= 1`, and schedules the retirement only when `i + k < n` — a flip whose window ends exactly at the last index never needs to be retired. An already-`1` effective bit costs nothing and advances with the sweep.

**Complexity:** `O(n)` time, `O(n)` space for the `hint` array.
