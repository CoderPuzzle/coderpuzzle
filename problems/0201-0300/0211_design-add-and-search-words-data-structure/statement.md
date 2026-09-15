# Design Add and Search Words Data Structure

## Description

Design a data structure that supports adding new words and finding whether a
query string matches any previously added string.

Implement the `WordDictionary` class:

- `WordDictionary()` Initializes the object.
- `void addWord(String word)` Adds `word` to the data structure; it can be
  matched later.
- `boolean search(String word)` Returns `true` if there is any string in the
  data structure that matches `word`, and `false` otherwise. `word` may
  contain dots `'.'`, where a dot can match any letter.

A query matches a stored word only when the two have the same length and agree
on every position where the query has a letter.

### Example 1

```text
Input:
["WordDictionary", "addWord", "addWord", "addWord", "search", "search", "search", "search"]
[[], ["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]]
Output: [null, null, null, null, false, true, true, true]
Explanation:
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return false — p does not match b, d or m
wordDictionary.search("bad"); // return true
wordDictionary.search(".ad"); // return true — matches bad, dad and mad
wordDictionary.search("b.."); // return true
```

### Example 2

```text
Input:
["WordDictionary", "addWord", "addWord", "search", "search", "search", "search", "search"]
[[], ["bad"], ["pad"], ["pad"], [".ad"], ["b.."], ["..d"], ["bad."]]
Output: [null, null, null, true, true, true, true, false]
Explanation:
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("pad");
wordDictionary.search("pad");  // return true — exact word
wordDictionary.search(".ad");  // return true — matches both stored words
wordDictionary.search("b..");  // return true
wordDictionary.search("..d");  // return true
wordDictionary.search("bad."); // return false — length 4, no stored word is that long
```

### Constraints

- `1 <= word.length <= 25` for both `addWord` and `search`.
- `word` in `addWord` consists of lowercase English letters.
- `word` in `search` consists of `'.'` or lowercase English letters.
- There will be at most `2` dots in a `search` query.
- At most `10⁴` calls will be made to `addWord` and `search`.

## Hints

### Hint 1

A hash set answers letter-only queries, but a dot forces you to try every
letter at that position — which means enumerating stored words. Store the
words in a trie instead, so the query follows a path the same way an insert
does, one node per character.

### Hint 2

When the query's current character is a letter, the walk has one possible next
node — the child for that letter. When it is a dot, every non-empty child slot
is possible, and `search` must try each of them, succeeding if any branch
completes the path.

### Hint 3

Two facts keep the branching cheap: queries are at most 25 characters long
with at most 2 dots, and a branch dies as soon as the remaining length
exceeds what any subtree stores. Depth plus pruning bounds the work, so plain
recursion over at most `26²` root-paths is enough.
