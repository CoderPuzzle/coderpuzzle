# Transpose File

## Description

A text file is piped to your script on standard input, holding a table
whose rows all share the same number of columns, one space separating
neighbouring fields. Write the file's transpose to standard output:
line one of the output is the file's first column, line two its second
column, and so on, with the fields of each column joined by single
spaces in their original order.

### Example 1

```text
Input:
name age
alice 21
ryan 30
Output:
name alice ryan
age 21 30
Explanation: reading the table down each column and writing across it
produces the two output lines.
```

### Constraints

- The table holds between 1 and 100 rows of 1 to 20 columns.
- Every field is 1 to 20 printable ASCII characters with no spaces.
- Rows are newline-terminated; fields are separated by exactly one
  space.
