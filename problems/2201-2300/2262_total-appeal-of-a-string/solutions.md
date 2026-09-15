# Solutions — Total Appeal of A String

## Last-occurrence contribution

Summing appeal over all `n(n+1)/2` substrings directly is quadratic, so flip the accounting: instead of asking each substring how many distinct characters it has, ask each character how many substrings contain it and sum over characters. Grouping by the substring's ending index `i`, a character `c` is present in exactly those substrings ending at `i` that start after `c`'s previous occurrence — that is `i - last[c]` substrings when `last[c]` is `c`'s most recent index before `i` (defaulting to `-1`, which correctly yields `i + 1`, all possible starts).

Define `current` as the total appeal of all substrings ending at `i`. When `i` advances, only one character's contribution changes — the new character `s[i]`, whose previous-occurrence distance updates — so `current` can be maintained incrementally with the single adjustment `current += i - last.get(c, -1)` rather than re-summing 26 counters per position. The answer accumulates `current` over all `i`.

Each substring is thus charged once per distinct character it contains, which is exactly its appeal, so the running sum is the total appeal. One pass, one small dictionary of at most 26 last-occurrence entries, no extra arrays.

**Complexity:** `O(n)` time, `O(1)` space.
