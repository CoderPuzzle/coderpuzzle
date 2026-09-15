# First Letter Capitalization II

## Description

Table: `user_content`

| Column Name  | Type    |
| ------------ | ------- |
| content_id   | int     |
| content_text | varchar |

`content_id` is the unique key for this table.
Each row contains a unique ID and the corresponding text content.

Write a solution to transform the text in the content_text column by applying
the following rules:

- Convert the first letter of each word to uppercase and the remaining letters
  to lowercase
- Special handling for words containing special characters:
    - For words connected with a hyphen -, both parts should be capitalized
      (e.g., top-rated → Top-Rated)
- All other formatting and spacing should remain unchanged

Return the result table that includes both the original content_text and the
modified text following the above rules.

Each testcase supplies its own `dataset`: the DDL seeds the `user_content`
table with that testcase's rows. Every maximal run of English letters is one
capitalization unit — its first letter becomes uppercase and every remaining
letter becomes lowercase — so hyphenated words capitalize both sides, and any
other character from the allowed list (space, @, -, /, ^, comma, backslash) is
copied through unchanged with exactly its original count and placement. Write
your solution as a single `SELECT` query returning three columns —
`content_id`, the unchanged text as `original_text`, and the transformed text
as `converted_text` — one row per input row, in any order.

The result format is in the following example.

### Example 1

```text
Input:
user_content table:
+------------+---------------------------------+
| content_id | content_text                    |
+------------+---------------------------------+
| 1          | hello world of SQL              |
| 2          | the QUICK-brown fox             |
| 3          | modern-day DATA science         |
| 4          | web-based FRONT-end development |
+------------+---------------------------------+
Output:
+------------+---------------------------------+---------------------------------+
| content_id | original_text                   | converted_text                  |
+------------+---------------------------------+---------------------------------+
| 1          | hello world of SQL              | Hello World Of Sql              |
| 2          | the QUICK-brown fox             | The Quick-Brown Fox             |
| 3          | modern-day DATA science         | Modern-Day Data Science         |
| 4          | web-based FRONT-end development | Web-Based Front-End Development |
+------------+---------------------------------+---------------------------------+
Explanation:
For content_id = 1:
Each word's first letter is capitalized: "Hello World Of Sql"
For content_id = 2:
Contains the hyphenated word "QUICK-brown" which becomes "Quick-Brown"
Other words follow normal capitalization rules
For content_id = 3:
Hyphenated word "modern-day" becomes "Modern-Day"
"DATA" is converted to "Data"
For content_id = 4:
Contains two hyphenated words: "web-based" → "Web-Based"
And "FRONT-end" → "Front-End"
```

### Constraints

- context_text contains only English letters, and the characters in the list
  `['\', ' ', '@', '-', '/', '^', ',']`
