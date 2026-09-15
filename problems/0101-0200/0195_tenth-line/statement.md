# Tenth Line

## Description

A text file is piped to your script on standard input, one line of the
file per line of input. Print exactly the 10th line of the file, and
nothing else. If the file holds fewer than ten lines, print nothing at
all — not even an empty line.

Line boundaries are the newline characters separating lines, and the
final line is newline-terminated like the rest.

### Example 1

```text
Input:
Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10
Output:
Line 10
Explanation: ten lines arrive and the tenth of them is `Line 10`, so
that line — and only that line — is written to standard output.
```

### Constraints

- The file holds between 1 and 1000 lines.
- Each line is 1 to 500 printable ASCII characters; there are no tabs or
  other control characters.
- Leading and trailing spaces are part of a line and must be preserved
  exactly.

## Hints

### Hint 1

Decide first what "fewer than ten lines" means for your tool of choice:
line-addressing utilities simply print nothing, but code that subscripts
a tenth element has to guard the count itself.

### Hint 2

At least three tool-level routes exist: hold every line and subscript,
take a ten-line prefix and keep its last line, or stream with a line
address or counter that stops the moment the tenth line lands.
