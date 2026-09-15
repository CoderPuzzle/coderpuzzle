# Bag of Tokens

## Description

You start with an initial power of `power`, an initial score of `0`, and a
bag of tokens given as an integer array `tokens`, where `tokens[i]` denotes
the value of the `i`th token.

Your goal is to maximize your total score by strategically playing these
tokens. In one move, you can play an unplayed token in one of two ways (but
not both for the same token):

- Face-up: if your current power is at least `tokens[i]`, you may play the
  `i`th token, losing `tokens[i]` power and gaining `1` score.
- Face-down: if your current score is at least `1`, you may play the `i`th
  token, gaining `tokens[i]` power and losing `1` score.

Return the maximum possible score you can achieve after playing any number
of tokens.

### Example 1

```text
Input: tokens = [100], power = 50
Output: 0
Explanation: The score starts at 0, so the token cannot be played face-down.
It cannot be played face-up either, since the current power (50) is less
than tokens[0] (100). No move is available, so the score stays 0.
```

### Example 2

```text
Input: tokens = [200,100], power = 150
Output: 1
Explanation: Play the token worth 100 face-up, reducing power to 50 and
increasing the score to 1. The token worth 200 cannot be played face-up
after that, and playing it face-down would only hand the point back, so the
maximum score achievable is 1.
```

### Example 3

```text
Input: tokens = [100,200,300,400], power = 200
Output: 2
Explanation: Play the tokens in this order. Play the token worth 100
face-up, reducing power to 100 and increasing the score to 1. Play the token
worth 400 face-down, increasing power to 500 and reducing the score to 0.
Play the token worth 200 face-up, reducing power to 300 and increasing the
score to 1. Play the token worth 300 face-up, reducing power to 0 and
increasing the score to 2.
```

### Constraints

- `0 <= tokens.length <= 1000`
- `0 <= tokens[i], power < 10⁴`
