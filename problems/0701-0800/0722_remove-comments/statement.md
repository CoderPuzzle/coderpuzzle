# Remove Comments

## Description

Given a C++ program, remove the comments from it. The source is given as an
array of strings `source`, where `source[i]` is the `i`th line of the source
code — the result of splitting the original source text on the newline
character `'\n'`.

C++ has two kinds of comments:

- The string `//` denotes a **line comment**: it and every character to its
  right on the same line are ignored.
- The string `/*` denotes a **block comment**: every character until the next
  (non-overlapping) occurrence of `*/` is ignored. Occurrences are found in
  reading order — line by line, left to right — so the string `/*/` does not
  yet close a block comment: the closing `*/` would overlap the opening `/*`.

The first effective comment takes precedence over the others: a `//` inside a
block comment is ignored, and a `/*` inside a line or block comment is also
ignored.

If a line of code is empty after removing the comments, you must not output
that line: every string in the answer list is non-empty. A line left holding
only spaces is not empty and is still output.

There will be no control characters, single quotes, or double quotes in the
source, and nothing else — defines, macros, or otherwise — interferes with
the comments. Every open block comment is eventually closed, so a `/*`
outside any comment always starts a new one.

A block comment also deletes the implicit newline characters between the lines
it spans, merging what surrounds it into a single output line — see Example 2.

After removing the comments, return the source code in the same format: an
array of the remaining lines.

### Example 1

```text
Input: source = ["/*Test program */", "int main()", "{ ", "  // variable declaration ", "int a, b, c;", "/* This is a test", "   multiline  ", "   comment for ", "   testing */", "a = b + c;", "}"]
Output: ["int main()", "{ ", "  ", "int a, b, c;", "a = b + c;", "}"]
Explanation:
The /* opens a block comment covering line 1 and lines 6-9; the // covers the
tail of line 4. Line 4 keeps its two leading spaces, and since the leftover
"  " is not empty the line is still output, while the fully consumed lines
disappear from the answer.
```

### Example 2

```text
Input: source = ["a/*comment", "line", "more_comment*/b"]
Output: ["ab"]
Explanation:
The block comment opens in the middle of line 1 and closes in the middle of
line 3, so the implicit newline characters between those lines are deleted
too. What survives is the "a" from line 1 joined with the "b" from line 3 —
a single output line "ab".
```

### Constraints

- `1 <= source.length <= 100`
- `0 <= source[i].length <= 80`
- `source[i]` consists of printable ASCII characters.
- Every open block comment is eventually closed.
- There are no single-quote or double-quote characters in the input.

## Hints

### Hint 1

Parse each line with a single flag carried across lines — whether you are
inside a block comment — plus one buffer for the line being built:

- If a `/*` starts and you are not in a block, skip two characters and enter
  the block.
- If a `*/` ends and you are in a block, skip two characters and leave the
  block.
- If a `//` starts and you are not in a block, ignore the rest of the line.
- If you are not in a block and no comment starts there, record the
  character.
- At the end of each line, if you are not in a block, record the line —
  unless it is empty — and start a fresh buffer.
