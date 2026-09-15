# Count Occurrences in Text

## Description

Table: `Files`

| Column Name | Type    |
| ----------- | ------- |
| file_name   | varchar |
| content     | text    |

file_name is the column with unique values of this table.
Each row contains file_name and the content of that file.

Write a solution to find the number of files that have at least one
occurrence of the words 'bull' and 'bear' as a standalone word,
respectively, disregarding any instances where it appears without space
on either side (e.g. 'bullet', 'bears', 'bull.', or 'bear' at the
beginning or end of a sentence will not be considered)

Return the word 'bull' and 'bear' along with the corresponding number of
occurrences in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Files`
table with that testcase's rows. A file's content is built of words
separated by spaces, and matching is case-sensitive — only the exact
lowercase word counts. An occurrence tallies when a space stands on both
sides of it; the start and end of the content act as boundaries, while
any letter or punctuation mark touching either side ('bullet', 'bears',
'bull.') disqualifies that occurrence. Both output rows are always
returned, even when a word occurs in no file, and a file contributes 1
to a word's count no matter how many times the word occurs in it. The
result format is in the following example.

### Example 1

```text
Input: Files table from the dataset below.
file_name   content
draft1.txt  The stock exchange predicts a bull market which would make
            many investors happy.
draft2.txt  The stock exchange predicts a bull market which would make
            many investors happy, but analysts warn of possibility of
            too much optimism and that in fact we are awaiting a bear
            market.
draft3.txt  The stock exchange predicts a bull market which would make
            many investors happy, but analysts warn of possibility of
            too much optimism and that in fact we are awaiting a bear
            market. As always predicting the future market is an
            uncertain game and all investors should follow their
            instincts and best practices.
Output:
word  count
bull  3
bear  2
Explanation: The word "bull" appears 1 time in "draft1.txt", 1 time in
"draft2.txt", and 1 time in "draft3.txt". Therefore, the total number
of occurrences for the word "bull" is 3. The word "bear" appears 1 time
in "draft2.txt", and 1 time in "draft3.txt". Therefore, the total
number of occurrences for the word "bear" is 2.
```

Write your solution as a single `SELECT` query returning two columns —
`word` and `count` — one row carrying `'bull'` and its number of files,
one carrying `'bear'` and its own, in any order.

## Hints

### Hint 1

An occurrence lives or dies by its immediate neighbors: pad the value into ' ' || content || ' ' and even the first and last word gain a neighbor on each side, so the whole question becomes whether the fixed substring ' bull ' (or ' bear ') appears anywhere inside the padded text.

### Hint 2

Use GLOB rather than LIKE: GLOB is case-sensitive, so '* bear *' passes 'a bear market.' (only the neighbors around 'bear' matter) yet rejects 'Bear', 'bears', and '(bear)', exactly as the statement demands — LIKE would fold case and wrongly pass 'Bear'.

### Hint 3

COUNT(*) tallies qualifying rows, and one row is one file, so repeated occurrences inside a file still contribute 1; computing each word's tally unconditionally keeps a zero-count word as a row with 0, UNION ALL stacks the two results, and the judge compares rows as an unordered multiset so no ORDER BY is needed.
