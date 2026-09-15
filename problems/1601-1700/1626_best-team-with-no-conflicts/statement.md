# Best Team With No Conflicts

## Description

You are assembling a basketball team from a pool of candidate players. Each
player has a `score` and an `age`; the team's total score is the sum of the
scores of the players you pick. You want the team with the highest possible
total score.

The team may not contain a **conflict**. A conflict exists between two
players when the younger of the two has a strictly higher score than the
older one. Two players of the same age never conflict with each other, no
matter how their scores compare, and you may include as many same-age
players as you like.

Given two arrays `scores` and `ages`, where `scores[i]` and `ages[i]` are
the score and age of the `i`-th player, return the highest total score
achievable by a conflict-free team.

### Example 1

```text
Input: scores = [1,3,5,10,15], ages = [1,2,3,4,5]
Output: 34
Explanation: Scores rise together with ages, so no pair conflicts. The
whole roster can be taken: 1 + 3 + 5 + 10 + 15 = 34.
```

### Example 2

```text
Input: scores = [4,5,6,5], ages = [2,1,2,1]
Output: 16
Explanation: The best team is players 1, 2, and 3 (0-indexed), with scores
5, 6, 5 and ages 1, 2, 1. Players 1 and 3 share the same age, so they
never conflict regardless of score. Player 2 (age 2, score 6) is older
than both and scores at least as much, so neither younger teammate
outscores it. The total is 5 + 6 + 5 = 16. This shows that multiple players of the same
age may be taken together.
```

### Example 3

```text
Input: scores = [1,2,3,5], ages = [8,9,10,1]
Output: 6
Explanation: Player 3 (age 1, score 5) is younger than every other player
and outscores all three of them, so it conflicts with each and must be
left out. The remaining players (ages 8, 9, 10 with scores 1, 2, 3) have
scores that never decrease as age increases, so all three can be taken
together: 1 + 2 + 3 = 6.
```

### Constraints

- `1 <= scores.length, ages.length <= 1000`
- `scores.length == ages.length`
- `1 <= scores[i] <= 10⁶`
- `1 <= ages[i] <= 1000`

## Hints

### Hint 1

First, sort the players by age and break ties by score. You can now
consider the players from left to right.

### Hint 2

If you choose to include a player, you must only choose players with at
least that score later on.
