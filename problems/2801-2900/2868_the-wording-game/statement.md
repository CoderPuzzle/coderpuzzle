# The Wording Game

## Description

Alice and Bob each have a lexicographically sorted array of strings named
a and b respectively.

They are playing a wording game with the following rules:

- On each turn, the current player should play a word from their list such
  that the new word is closely greater than the last played word; then
  it's the other player's turn.
- If a player can't play a word on their turn, they lose.

Alice starts the game by playing her lexicographically smallest word.

Given a and b, return true if Alice can win knowing that both players play
their best, and false otherwise.

A word w is closely greater than a word z if the following conditions are
met:

- w is lexicographically greater than z.
- If w₁ is the first letter of w and z₁ is the first letter of z, w₁
  should either be equal to z₁ or be the letter after z₁ in the alphabet.
- For example, the word "care" is closely greater than "book" and "car",
  but is not closely greater than "ant" or "cook".

A string s is lexicographically greater than a string t if in the first
position where s and t differ, string s has a letter that appears later in
the alphabet than the corresponding letter in t. If the first
min(s.length, t.length) characters do not differ, then the longer string
is the lexicographically greater one.

### Example 1

```text
Input: a = ["avokado","dabar"], b = ["brazil"]
Output: false
Explanation: Alice must start the game by playing the word "avokado" since
it's her smallest word, then Bob plays his only word, "brazil", which he
can play because its first letter, 'b', is the letter after Alice's word's
first letter, 'a'.
Alice can't play a word since the first letter of the only word left is not
equal to 'b' or the letter after 'b', 'c'.
So, Alice loses, and the game ends.
```

### Example 2

```text
Input: a = ["ananas","atlas","banana"], b = ["albatros","cikla","nogomet"]
Output: true
Explanation: Alice must start the game by playing the word "ananas".
Bob can't play a word since the only word he has that starts with the
letter 'a' or 'b' is "albatros", which is smaller than Alice's word.
So Alice wins, and the game ends.
```

### Example 3

```text
Input: a = ["hrvatska","zastava"], b = ["bijeli","galeb"]
Output: true
Explanation: Alice must start the game by playing the word "hrvatska".
Bob can't play a word since the first letter of both of his words are
smaller than the first letter of Alice's word, 'h'.
So Alice wins, and the game ends.
```

### Constraints

- `1 <= a.length, b.length <= 10⁵`
- `a[i] and b[i] consist only of lowercase English letters.`
- `a and b are lexicographically sorted.`
- `All the words in a and b combined are distinct.`
- `The sum of the lengths of all the words in a and b combined does not
exceed 10⁶.`

## Hints

### Hint 1

If both Alice and Bob for each letter of the alphabet have at least one
word beginning with that letter, then the winner is the player who has the
lexicographically greatest word.

### Hint 2

What happens if both have words that begin with the first x letters of the
alphabet, but only one of them has a word beginning with the x + 1th
letter?

### Hint 3

Suppose Alice has a word beginning with the x + 1th letter. Note that if
Alice has the lexicographically greatest word beginning with one of the
first x letters, then she is the winner. But if Bob has such a word, then
the game continues.

### Hint 4

Now, we can conclude the winner is determined by the first letter which a
player doesn’t have a word beginning with, and the other player has the
lexicographically greatest word among all the words beginning with the
letters before that letter.
