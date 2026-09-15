# Stone Game V

## Description

There are several stones arranged in a row; `stoneValue[i]` is the value
of the `i`-th stone.

A single player, Alice, repeatedly plays rounds against this fixed rule:

- She splits the current row into two non-empty, contiguous parts: a left
  part and a right part.
- Each part's weight is the sum of the values of its stones. Whichever
  part has the **strictly larger** weight is discarded. Alice's score
  increases by the weight of the part that is **kept**.
- If the two parts have equal weight, one of them is discarded and Alice
  gets to choose which one — either way her score increases by that
  shared weight, but the choice of which part survives can change how
  much score is available in later rounds.
- The next round starts with whichever part was kept.

The game ends once only one stone remains in the row (a single stone
cannot be split further). Alice's score starts at zero.

Return the maximum score Alice can obtain by choosing her splits (and her
tie-break choices) optimally throughout the game.

### Example 1

```text
Input: stoneValue = [6,2,3,4,5,5]
Output: 18
Explanation: In the first round, Alice splits the row into [6,2,3] and
[4,5,5]. The left part has weight 11 and the right part has weight 14;
the right part is discarded and Alice's score becomes 11.
In the second round, Alice splits [6,2,3] into [6] and [2,3]. The left
part has weight 6 and the right part has weight 5; the left part is
discarded and Alice's score becomes 16 (11 + 5).
In the last round, [2,3] can only split into [2] and [3]; the right part
is discarded and Alice's score becomes 18 (16 + 2). Only one stone, [2],
remains, so the game ends.
```

### Example 2

```text
Input: stoneValue = [7,7,7,7,7,7,7]
Output: 28
```

### Example 3

```text
Input: stoneValue = [4]
Output: 0
```

### Constraints

- `1 <= stoneValue.length <= 500`
- `1 <= stoneValue[i] <= 10⁶`

## Hints

### Hint 1

Try every possible split of the current row to see which one leaves
Alice with the best score from that point on.

### Hint 2

Splitting the same sub-row of stones the same way always leads to the
same best score, so many splits recompute the same sub-problem. Cache
results by sub-row (dynamic programming) instead of recomputing them.
