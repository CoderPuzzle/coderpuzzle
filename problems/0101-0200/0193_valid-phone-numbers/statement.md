# Valid Phone Numbers

## Description

A text file is piped to your script on standard input, one candidate
phone number per line, with no leading or trailing white space on any
line. Print every line that is a valid phone number, in order, and
nothing else. A valid phone number appears in exactly one of two forms:
`xxx-xxx-xxxx` or `(xxx) xxx-xxxx`, where each `x` stands for a digit.

### Example 1

```text
Input:
987-123-4567
123 456 7890
(123) 456-7890
Output:
987-123-4567
(123) 456-7890
Explanation: the second line uses spaces in place of the permitted
separators, so it is not a valid number.
```

### Constraints

- The file holds between 1 and 1000 lines.
- Each line is 1 to 30 printable ASCII characters.
- No line begins or ends with white space.
