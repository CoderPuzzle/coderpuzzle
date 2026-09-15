# Solutions — Stone Game VI

## Greedy by Combined Value

Taking stone `i` does two things at once: it adds `aliceValues[i]` to the taker's score and removes `bobValues[i]` from the opponent's reach. From the perspective of the score difference (Alice minus Bob), choosing stone `i` swings the outcome by `aliceValues[i] + bobValues[i]` — your own gain plus the denial of the rival's — regardless of which player moves. The game is therefore a sequence of grabs at the largest combined value.

Sort the stone indices by `aliceValues[i] + bobValues[i]` descending and let the players alternate in that order: Alice takes ranks 0, 2, 4, … adding her values to the difference, Bob takes the odd ranks subtracting his. The sign of the final difference decides the result — positive for Alice, negative for Bob, zero for a draw. An exchange argument justifies the greedy: if a player skips a stone of larger combined value for a smaller one, the opponent can take the larger stone and the mover's differential position strictly worsens.

Only relative order matters, so ties in combined value are harmless. The pass after sorting is linear, leaving the sort as the dominant cost; the index list used for ordering is the only extra allocation.

**Complexity:** `O(n log n)` time, `O(n)` space.
