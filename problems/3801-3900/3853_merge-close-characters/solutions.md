# Solutions — Merge Close Characters

The leftmost-first rule reads as if it demands repeated rescans of a string
whose indices shift under every merge, with chains of new pairs snapping
into range as characters disappear. In fact a merge only ever deletes the
right member of its pair, so the past is never revised, and one
left-to-right sweep decides everything.

## One-pass stack sweep with a k-wide window

Keep a stack of survivors that never itself contains a close pair. When a
character arrives, it is the rightmost element of the current string, so
every close pair it can participate in has it as the right member — the one
a merge deletes. Its index would be exactly `stack.length`, so it is close
to an equal survivor `q` precisely when `stack.length - q <= k`, i.e. when
it equals one of the last `k` survivors. If it does, the merge (whichever
equal survivor the leftmost-first tie-break names as the left partner)
deletes the newcomer and the string returns to the stable prefix; if not,
it settles on top and stability is preserved. Either way the invariant
survives the step, so the stack after the final character is the answer —
the tie-break never changes the outcome, only which of the equal survivors
the vanishing character is said to merge into.

The sweep is a single flat loop — no recursion, no cascade stack — with an
inner scan of at most `k` window positions per character. Removals never
disturb the settled prefix: deleting a character at position `p` leaves
every index below `p` and every distance between two indices below `p`
untouched, which is exactly why the window test on the stack mirrors the
sequential process's shifting indices correctly.

With `n <= 100` the `O(n · min(n, k))` work is trivial; the returned string
is at most `n` characters and the stack is the only extra storage, so no
language faces width or depth hazards.

**Complexity:** `O(n · min(n, k))` time, `O(n)` space.
