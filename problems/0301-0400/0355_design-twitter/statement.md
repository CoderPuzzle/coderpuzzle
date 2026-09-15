# Design Twitter

## Description

Design a simplified version of Twitter where users can post tweets, follow or
unfollow other users, and see the 10 most recent tweets in their news feed.

Implement the `Twitter` class:

- `Twitter()` Initializes the twitter object.
- `void postTweet(int userId, int tweetId)` Composes a new tweet with ID
  `tweetId` by the user `userId`. Each call is made with a `tweetId` not used
  by any other tweet.
- `int[] getNewsFeed(int userId)` Retrieves the 10 most recent tweet IDs in
  the user's news feed. Each item in the news feed must be a tweet posted by
  `userId` themself or by a user that `userId` follows, ordered from most
  recent to least recent. Fewer than 10 tweets may exist.
- `void follow(int followerId, int followeeId)` The user with ID
  `followerId` starts following the user with ID `followeeId`.
- `void unfollow(int followerId, int followeeId)` The user with ID
  `followerId` stops following the user with ID `followeeId`.

A user's own tweets always appear in their feed whether or not they follow
themselves. Following a user that has not posted anything is allowed, and so
is following a user that was never seen before — their tweets simply join the
feed once they post.

### Example 1

```text
Input:
["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
Output: [null, null, [5], null, null, [6, 5], null, [5]]
Explanation:
Twitter twitter = new Twitter();
twitter.postTweet(1, 5); // user 1 posts tweet 5
twitter.getNewsFeed(1);  // user 1's feed is [5]
twitter.follow(1, 2);    // user 1 follows user 2
twitter.postTweet(2, 6); // user 2 posts tweet 6
twitter.getNewsFeed(1);  // feed is [6, 5] — 6 is newer than 5
twitter.unfollow(1, 2);  // user 1 unfollows user 2
twitter.getNewsFeed(1);  // feed is back to [5]
```

### Example 2

```text
Input:
["Twitter", "postTweet", "postTweet", "getNewsFeed", "postTweet", "postTweet", "getNewsFeed"]
[[], [1, 101], [1, 102], [1], [1, 103], [1, 104], [1]]
Output: [null, null, null, [102, 101], null, null, [104, 103, 102, 101]]
Explanation:
Twitter twitter = new Twitter();
twitter.postTweet(1, 101);
twitter.postTweet(1, 102);
twitter.getNewsFeed(1); // [102, 101]
twitter.postTweet(1, 103);
twitter.postTweet(1, 104);
twitter.getNewsFeed(1); // [104, 103, 102, 101, 100] — fewer than 10 tweets
```

### Constraints

- `1 <= userId, followerId, followeeId <= 500`
- `0 <= tweetId <= 10⁴`
- All tweets have unique IDs.
- At most `3 * 10⁴` calls will be made to `postTweet`, `getNewsFeed`,
  `follow`, and `unfollow`.
- A user cannot follow themself.

## Hints

### Hint 1

Only recency matters for ordering, and every post already arrives in
chronological order — so a global counter stamped on each tweet gives every
tweet a rank, and each user's tweets appended to a list are automatically
newest-last. The feed question then reduces to merging several lists that are
each already sorted by recency.

### Hint 2

The feed is the 10 largest of "the last 10 tweets of the user and of each
followee". A min-heap of size 10 does the selection: push each candidate, and
pop the smallest whenever the heap exceeds 10 — what survives is exactly the
10 most recent overall.

### Hint 3

Keep followees in a hash set per user so `follow` and `unfollow` are constant
average time and duplicates are harmless. When merging, only the tail of each
poster's list (up to 10 entries) can possibly reach the feed, so scan the
lists backwards.
