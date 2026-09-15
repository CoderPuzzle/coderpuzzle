# Solutions — Find Consecutive Integers from a Data Stream

## Running suffix-match counter

The question "are the last `k` integers all equal to value" only depends
on how many consecutive matches end at the number just parsed. Every time
`consec` sees the tracked value that run grows by one; every other number
annihilates it back to zero. So instead of remembering what those last `k`
integers were, one integer remembers something strictly stronger: the
length of the current suffix of matches.

Each call updates the streak in constant time and answers by comparing it
against `k`. The early-stream rule falls out for free — before `k`
integers exist, the streak can be at most the number parsed so far, so it
cannot reach `k` and the answer is false without any special case. Once
the window is full of matches, more matches keep it full and a single
stranger starts the count over from zero.

With `k` up to 10⁵ and at most 10⁵ calls this is linear overall with
constant state per call. All values fit in 32-bit integers (≤ 10⁹) and
the streak never exceeds the call count, so no wider arithmetic is needed
in any language.

**Complexity:** `O(1)` time per `consec` call (`O(n)` total), `O(1)` space.
