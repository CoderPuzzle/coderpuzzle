# Solutions — Invalid Tweets

One predicate per row decides everything: a tweet is invalid exactly when
its `content` is strictly longer than 15 characters, so filtering the table
on that character count and projecting `tweet_id` is the whole answer.

## Filter on the content length

`LENGTH(content)` counts the characters in `content`, and the comparison
`> 15` keeps only the rows whose count is strictly greater than 15 — a
content of exactly 15 characters stays valid, 16 is already invalid, and
every character in the allowed alphabet (letters, digits, `'!'`, and
spaces) counts toward the total. The `WHERE` clause applies the predicate
to each row of `Tweets` independently, and the projection returns just
`tweet_id`, so the result carries one row per invalid tweet.

The statement allows the result in any order, so the query needs no
`ORDER BY` — the judge compares result multisets, and row order cannot
fail a case.

**Complexity:** `O(n)` time, `O(n)` space.
