# Stream of Characters

## Description

Design an algorithm that accepts a stream of characters and checks if a
**suffix of these characters** is a string of a given array of strings
`words`.

For example, if `words = ["abc", "xyz"]` and the stream added the four
characters (one by one) `'a'`, `'x'`, `'y'`, and `'z'`, your algorithm should
detect that the suffix `"xyz"` of the characters `"axyz"` matches `"xyz"`
from `words`.

Implement the `StreamChecker` class:

- `StreamChecker(String[] words)` Initializes the object with the strings
  array `words`.
- `boolean query(char letter)` Accepts a new character from the stream and
  returns `true` if any non-empty suffix from the stream forms a word that is
  in `words`.

### Example 1

```text
Input:
["StreamChecker", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query"]
[[["cd", "f", "kl"]], ["a"], ["b"], ["c"], ["d"], ["e"], ["f"], ["g"], ["h"], ["i"], ["j"], ["k"], ["l"]]
Output: [null, false, false, false, true, false, true, false, false, false, false, false, true]
Explanation:
StreamChecker streamChecker = new StreamChecker(["cd", "f", "kl"]);
streamChecker.query("a"); // return False
streamChecker.query("b"); // return False
streamChecker.query("c"); // return False
streamChecker.query("d"); // return True, because 'cd' is in the wordlist
streamChecker.query("e"); // return False
streamChecker.query("f"); // return True, because 'f' is in the wordlist
streamChecker.query("g"); // return False
streamChecker.query("h"); // return False
streamChecker.query("i"); // return False
streamChecker.query("j"); // return False
streamChecker.query("k"); // return False
streamChecker.query("l"); // return True, because 'kl' is in the wordlist
```

### Constraints

- `1 <= words.length <= 2000`
- `1 <= words[i].length <= 200`
- `words[i]` consists of lowercase English letters.
- `letter` is a lowercase English letter.
- At most `4 * 10⁴` calls will be made to `query`.

## Hints

### Hint 1

The match can begin at any past position, so the state to maintain is: for
every position where a dictionary word might still be forming, how deep into
the dictionary that partial match is. A trie of the words turns "depth" into a
node — the state becomes a set of trie nodes.

### Hint 2

Keep the trail of nodes the stream suffixes currently reach. A new letter
advances every node in the trail by one edge (a node without that edge is a
dead start — drop it) and adds the root, so the newest character can begin a
fresh suffix. The trail never exceeds the longest word's length.

### Hint 3

The answer is whether any node reached by the new letter is flagged as a
complete word. A dropped start can never come back: its partial match has
already diverged from every word, and only a fresh root entry restarts
matching at a new position.
