# Count and Say

## Description

The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

```text
countAndSay(1) = "1"
countAndSay(n) is the run-length encoding of countAndSay(n - 1).
```

Run-length encoding (RLE) is a string compression method that works by replacing each maximal group
of consecutive identical characters with the concatenation of the length of the group followed by the
character itself. For example, to compress the string "3322251" we replace "33" with "23", replace
"222" with "32", replace "5" with "15", and replace "1" with "11". Thus the compressed string becomes
"23321511".

Given a positive integer `n`, return the nth element of the count-and-say sequence.

### Example 1

```text
Input: n = 4
Output: "1211"
Explanation: countAndSay(1) = "1"
countAndSay(2) = RLE of "1" = "11"
countAndSay(3) = RLE of "11" = "21"
countAndSay(4) = RLE of "21" = "1211"
```

### Example 2

```text
Input: n = 1
Output: "1"
Explanation: This is the base case.
```

### Constraints

- `1 <= n <= 30`

### Follow-up

Could you solve it iteratively?

## Hints

### Hint 1

Create a helper function that maps an integer to pairs of its digits and their frequencies. For
example, if you call this function with "223314444411", then it maps it to an array of pairs
[[2,2], [3,2], [1,1], [4,5], [1, 2]].

### Hint 2

Create another helper function that takes the array of pairs and creates a new integer. For example,
if you call this function with [[2,2], [3,2], [1,1], [4,5], [1, 2]], it should create
"22"+"23"+"11"+"54"+"21" = "2223115421".

### Hint 3

Now, with the two helper functions, you can start with "1" and call the two functions alternatively
n-1 times. The answer is the last integer you will obtain.
