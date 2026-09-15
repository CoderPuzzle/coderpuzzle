# Solutions — Find Words Containing Character

## Linear scan with substring search

A word belongs in the answer exactly when the character occurs somewhere
in it, and every mainstream runtime ships a substring search that answers
that question in one call — Python's `in`, `indexOf` in JavaScript and
Java, `find` in C++, `strings.Contains` in Go, `contains` in Rust. The
code therefore walks `words` once and keeps the index of every word whose
search succeeds.

Each kept index is appended in walk order, so the result lists the
matching indices ascending; the statement accepts any order. The search
per word is `O(len(word))` and no word exceeds 50 characters, so the
whole scan touches at most 2500 characters.

**Complexity:** `O(total characters)` time, `O(1)` extra space beside the
output.
