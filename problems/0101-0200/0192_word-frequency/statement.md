# Word Frequency

## Description

A text file is piped to your script on standard input as a sequence of
lowercase words separated by one or more spaces, possibly spread over
several lines. Print each distinct word once, followed by a single
space and the number of times it occurs, and order the lines by
descending frequency. Each word's count is guaranteed to be unique, so
the ordering is total.

### Example 1

```text
Input:
the day is sunny the the
the sunny is is
Output:
the 4
is 3
sunny 2
day 1
Explanation: `the` occurs four times, `is` three, `sunny` twice and
`day` once.
```

### Constraints

- The file holds between 1 and 1000 words.
- Every word consists of 1 to 20 lowercase English letters.
- Words are separated by one or more spaces; line breaks may fall
  between words.
- No two distinct words occur the same number of times.
