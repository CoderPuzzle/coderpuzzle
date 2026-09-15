# Solutions — Water and Jug Problem

## The multiples of the gcd

Track only the total `a + b` in the two jugs. Filling a jug adds its full capacity to the total, emptying one removes a full capacity, and pouring merely relocates water between the jugs — so every operation moves the total by `±x`, `±y`, or `0`, each a multiple of `g = gcd(x, y)`. The total starts at 0 and can never leave the range `[0, x + y]`, so by induction every reachable total is a multiple of `g` not exceeding `x + y`. That is the whole invariant, and Example 2 is its negative face: jugs of 2 and 6 liters have `g = 2`, so the odd total 5 can never appear no matter the sequence.

The converse also holds, by Bézout's lemma. There are integers `u` and `v` with `ux + vy = g`, and the fill/pour/empty rotation realizes exactly those combinations: the running total of any operation sequence changes only by whole jug-loads, so the reachable totals are precisely the combinations `ux + vy` clipped to what the two jugs can physically hold — every multiple of `g` from 0 to `x + y`. Example 1's jugs of 3 and 5 liters are coprime (`g = 1`), so every total up to 8 is reachable and the listed steps land on 4; Example 3 just fills both jugs for the total `x + y = 3`.

The method is the closed form. A target above `x + y` is out of range at once, and target 0 is the starting state, measurable with any two jugs — both empty ones included. Otherwise the Euclidean algorithm's modulo loop computes `g` and the answer is `target % g == 0`, with the guard on `g` keeping the modulo safe when both capacities are zero. No state graph is ever built; the two jug capacities alone decide.

**Complexity:** `O(log min(x, y))` time, `O(1)` space.
