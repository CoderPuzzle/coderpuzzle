# Solutions — Guess the Word

## Minimax elimination

Each `guess(w) = k` is a constraint with a remarkable property: the secret must agree with `w` in exactly `k` positions, so filtering the candidate pool down to the words satisfying that constraint can never discard the secret. Every round therefore shrinks the pool to the "family" of `w` at distance `k`, and the only question is which `w` to spend a guess on.

Picking an arbitrary candidate is fragile: for lists whose words rarely share letters, almost every answer is 0, and the surviving family is nearly the whole pool — ten rounds barely scratch a 100-word list. Instead, score every candidate `w` by the size of its largest agreement bucket (partition the pool by `matches(w, c)`) and guess the candidate with the smallest such bucket: whatever answer comes back, the surviving pool is guaranteed to be no larger than that bucket. This minimax choice simultaneously favors words that are maximally "spread out" over the possible answers, which is exactly the guess that shrinks the pool fastest in the worst case.

The loop is pick → guess → filter, stopping when the answer is 6 (the word guessed agrees everywhere, hence equals the unique secret). On the classic adversarial list — words pairwise agreeing in zero positions — every guess removes exactly one word, so six guesses finish a six-word list. Scoring is `O(n^2 L)` per round with `L = 6`, trivial at `n <= 100`.

**Complexity:** `O(n^2 · L · g)` time with `g <= 10` rounds, `O(n)` space.
