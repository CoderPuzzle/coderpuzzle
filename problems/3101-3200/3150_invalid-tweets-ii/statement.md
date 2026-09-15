# Invalid Tweets II

## Description

Table: `Tweets`

| Column Name | Type    |
| ----------- | ------- |
| tweet_id    | int     |
| content     | varchar |

`tweet_id` is the primary key (column with unique values) for this table.
This table contains all the tweets in a social media app.

Write a solution to find invalid tweets. A tweet is considered invalid if
it meets any of the following criteria:

- It exceeds 140 characters in length.
- It has more than 3 mentions.
- It includes more than 3 hashtags.

Return the result table ordered by `tweet_id` in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Tweets` table
with that testcase's rows. In every dataset each `'@'` inside `content`
opens a mention, each `'#'` opens a hashtag, so the number of mentions
(hashtags) of a tweet is the number of `'@'` (`'#'`) characters it
contains, and no content is empty or contains quotes. The result format
is shown in the following example.

### Example 1

```text
Input:
Tweets table:
+----------+----------------------------------------------------------------------------------+
| tweet_id | content                                                                          |
+----------+----------------------------------------------------------------------------------+
| 1        | Traveling, exploring, and living my best life @JaneSmith @SaraJohnson            |
|          | @LisaTaylor @MikeBrown #Foodie #Fitness #Learning                                |
| 2        | Just had the best dinner with friends! #Foodie #Friends #Fun                     |
| 4        | Working hard on my new project #Work #Goals #Productivity #Fun                   |
+----------+----------------------------------------------------------------------------------+
Output:
+----------+
| tweet_id |
+----------+
| 1        |
| 4        |
+----------+
Explanation:
    tweet_id 1 contains 4 mentions.
    tweet_id 4 contains 4 hashtags.
Output table is ordered by tweet_id in ascending order.
```

Write your solution as a single `SELECT` query returning one column —
`tweet_id` — containing exactly the ids of the invalid tweets in ascending
order. Return the result table in that order.
