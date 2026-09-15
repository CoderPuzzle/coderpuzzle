# Design Search Autocomplete System

## Description

Design a search autocomplete system for a search engine. Users may input a
sentence (at least one word and ending with the special character `#`).

You are given a string array `sentences` and an integer array `times`, both of
length `n`, where `sentences[i]` is a previously typed sentence and `times[i]`
is the corresponding number of times the sentence was typed. For each input
character except `#`, return the top 3 historical hot sentences that have the
same prefix as the part of the sentence already typed.

The specific rules:

- The hot degree of a sentence is the number of times a user typed exactly
  that sentence before.
- The returned top 3 hot sentences are sorted by hot degree (the first is the
  hottest one). If several sentences have the same hot degree, sort them by
  ASCII order (the smaller one appears first).
- If fewer than 3 hot sentences exist, return as many as you can.
- When the input is the special character `#`, the sentence ends — return an
  empty list and record the sentence.

Implement the `AutocompleteSystem` class:

- `AutocompleteSystem(String[] sentences, int[] times)` Initializes the object
  with the historical sentences and their counts.
- `List<String> input(char c)` Indicates that the user typed the character
  `c`. Returns an empty array if `c == '#'` (and stores the sentence typed so
  far); otherwise returns the top 3 historical hot sentences that have the
  same prefix as the sentence typed so far, t hottest first.

### Example 1

```text
Input:
["AutocompleteSystem", "input", "input", "input", "input"]
[[["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]], ["i"], [" "], ["a"], ["#"]]
Output:
[null, ["i love you", "island", "i love leetcode"], ["i love you", "i love leetcode"], [], []]
Explanation:
AutocompleteSystem obj = new AutocompleteSystem(["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]);
obj.input("i"); // return ["i love you", "island", "i love leetcode"]. There are four sentences that have prefix "i".
// "iroman" and "i love leetcode" have the same hot degree. Since ' ' (32) is smaller than 'r' (114),
// "i love leetcode" comes first; only the top 3 are returned, so "iroman" is left out.
obj.input(" "); // return ["i love you", "i love leetcode"]. Two sentences have prefix "i ".
obj.input("a"); // return []. No sentence has prefix "i a".
obj.input("#"); // return []. The sentence "i a" is recorded; the next input starts a new search.
```

### Example 2

```text
Input:
["AutocompleteSystem", "input", "input", "input", "input", "input", "input"]
[[["a", "ab", "abc"], [1, 2, 3]], ["a"], ["b"], ["#"], ["a"], ["c"], ["#"]]
Output: [null, ["abc", "ab", "a"], ["abc", "ab"], [], ["ab", "abc", "a"], [], []]
Explanation:
AutocompleteSystem obj = new AutocompleteSystem(["a", "ab", "abc"], [1, 2, 3]);
obj.input("a"); // return ["abc", "ab", "a"] — hot degrees 3, 2, 1.
obj.input("b"); // return ["abc", "ab"] — only two sentences have prefix "ab".
obj.input("#"); // return [], the sentence "ab" is recorded; its hot degree becomes 3.
obj.input("a"); // return ["ab", "abc", "a"] — "ab" and "abc" both have hot degree 3
// and "ab" < "abc" in ASCII order, so "ab" comes first.
obj.input("c"); // return [], no sentence has prefix "ac".
obj.input("#"); // return [], the sentence "ac" is recorded.
```

### Constraints

- `n == sentences.length == times.length`
- `1 <= n <= 100`
- `1 <= sentences[i].length <= 100`
- `1 <= times[i] <= 50`
- `c` is a lowercase English letter, a hash `#`, or a space ` `.
- Each tested sentence is a sequence of characters `c` that ends with the
  character `#`.
- Each tested sentence has a length in the range `[1, 200]`.
- The words in each sentence are separated by single spaces.
- At most `5000` calls will be made to `input`.

## Hints

### Hint 1

What must the system remember? A map from every typed prefix to the sentences
below it. Instead of storing that map for every prefix, share structure: a
trie stores each sentence once, and the node you reach after `k` characters
is exactly the state of the `k`-character prefix.

### Hint 2

Keep the hot degree at the node where a sentence ends, and keep a pointer to
the current node as characters arrive. Descend one edge per character; if the
edge is missing, the prefix matches nothing — remember that dead state (you
still need to buffer the characters until `#`).

### Hint 3

For a match list, depth-first search from the current node collects every
sentence below it together with its hot degree. Sorting the collected
`(hotness, sentence)` pairs by descending hotness and ascending ASCII gives
the order; cut after three. A `#` walks the trie once more along the buffered
sentence and increments its count.
