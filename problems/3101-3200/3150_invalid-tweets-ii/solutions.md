# Solutions — Invalid Tweets II

## Filter tweets whose length, mention count, or hashtag count busts a limit

A tweet is invalid the moment any single statistic of `content` crosses
its threshold, so no grouping is needed — the query can probe each tweet's
own text in one `WHERE` clause and keep the survivors. The length test is
a direct `LENGTH(content) > 140`. The mention and hashtag tests use
a counting identity instead of parsing: replacing every `'@'` (or `'#'`)
with an empty string shrinks the text by exactly one character per
occurrence, so `LENGTH(content) - LENGTH(REPLACE(content, '@', ''))` is
the number of mentions, comparing it against 4 with `> 3` realizes "more
than 3", and the identical probe with `'#'` does the same for hashtags.

The three tests are OR-ed because the criteria are alternatives — meeting
any one makes the tweet invalid. Finally `ORDER BY tweet_id` emits the ids
in ascending order; SQLite orders integers numerically, so gaps and
scrambled insertion order in the table never disturb the output sequence.
Every case guarantees each `'@'`/`'#'` opens its own mention or hashtag,
which is exactly the situation this character-count identity measures, and
no content contains quotes, so the replacement probes are unambiguous.

**Complexity:** `O(n · L)` time and `O(1)` extra space beyond the scan,
for `n` tweets of average length `L`.
