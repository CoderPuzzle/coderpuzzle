# Invalid Tweets

## Description

Table: `Tweets`

| Column Name | Type    |
| ----------- | ------- |
| tweet_id    | int     |
| content     | varchar |

`tweet_id` is the primary key (column with unique values) for this table.
`content` consists of alphanumeric characters, '!', or ' ' and no other
special characters. This table contains all the tweets in a social media
app.

Write a solution to find the IDs of the invalid tweets. The tweet is
invalid if the number of characters used in the content of the tweet is
strictly greater than 15.

Return the result table in any order.

Each testcase's `dataset` seeds the `Tweets` table: its script inserts the
testcase's `Tweets` rows before your query runs. The result format is in
the following example.

### Example 1

```text
Input:
Tweets table:
+----------+-----------------------------------+
| tweet_id | content                           |
+----------+-----------------------------------+
| 1        | Let us Code                       |
| 2        | More than fifteen chars are here! |
+----------+-----------------------------------+
Output:
+----------+
| tweet_id |
+----------+
| 2        |
+----------+
Explanation:
Tweet 1 has length = 11. It is a valid tweet.
Tweet 2 has length = 33. It is an invalid tweet.
```

Write your solution as a single `SELECT` query returning the `tweet_id` of
every tweet whose `content` uses strictly more than 15 characters, in any
order.
