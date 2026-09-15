# Distant Barcodes

## Description

In a warehouse, there is a row of barcodes, where the ith barcode is
barcodes[i].

Rearrange the barcodes so that no two adjacent barcodes are equal. You
may return any answer, and it is guaranteed an answer exists.

Many valid rearrangements exist for most inputs, but this judge compares
the returned array exactly, so the rearrangement must come from one
deterministic procedure. Count the frequency of each distinct value in
`barcodes`. Process the distinct values from the highest frequency to
the lowest; among values tied on frequency, process them in ascending
numeric order. Fill the output array's positions in the fixed order
0, 2, 4, ... (every even index, low to high) and then 1, 3, 5, ...
(every odd index, low to high), placing each processed value into that
many consecutive positions in that order before moving to the next
value.

### Example 1

```text
Input: barcodes = [1,1,1,2,2,2]
Output: [1,2,1,2,1,2]
Explanation:
Values 1 and 2 are tied at frequency 3, so they are processed in
ascending order: 1 before 2. Value 1 fills the even positions 0, 2, 4;
value 2 fills the odd positions 1, 3, 5. Other valid answers include
[2,1,2,1,2,1], but this is the one the deterministic procedure above
produces.
```

### Example 2

```text
Input: barcodes = [1,1,1,1,2,2,3,3]
Output: [1,2,1,2,1,3,1,3]
Explanation:
Value 1 has the highest frequency (4) and is processed first, filling
positions 0, 2, 4, 6. Values 2 and 3 are tied at frequency 2 and are
processed in ascending order: value 2 fills positions 1, 3; value 3
fills positions 5, 7.
```

### Constraints

- `1 <= barcodes.length <= 10000`
- `1 <= barcodes[i] <= 10000`

## Hints

### Hint 1

We want to always choose the most common or second most common element
to write next. What data structure allows us to query this effectively?
