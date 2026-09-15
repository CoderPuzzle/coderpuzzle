# Solutions — Find Trending Hashtags II

## Split every tweet at its hashtags, group, keep the top three

Unlike its single-hashtag sibling, a tweet here can carry several tags, so
counting is a token-splitting job first. A recursive CTE walks each tweet's
text: every step anchors on the next `#` — `INSTR(rest, '#')` — lifts the
tag from there to the following space (a virtual trailing space makes the
end-of-tweet case uniform), and the remainder after that tag becomes the
next `rest`. The recursion stops once no `#` survives, which terminates
because every step consumes the anchor character plus everything before
the next one. One row per occurrence leaves the CTE — the same tag repeated
inside a single tweet legitimately contributes several rows.

Counting those occurrences is then plain aggregation: an inner select drops
the seed row's NULL tag, the outer `GROUP BY hashtag` counts mentions, and
the window function alternative would do exactly the same partitioned work.
The final `ORDER BY count DESC, hashtag DESC LIMIT 3` realizes the demanded
ranking; because hashtag values are unique grouping keys, the descending
name tiebreak always breaks equal counts deterministically — it decides the
third seat whenever several tags share a boundary count, as in the example,
where `#WorkLife` beats seven other single-mention tags.

**Complexity:** `O(n + k log k)` time, `O(k)` space — `n` the total tweet
text length walked once by the splitter, `k` the distinct tags then sorted.
