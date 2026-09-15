# Solutions — Vowels Game in a String

## One scan for a single vowel

The game looks like a search over substring deletions, but it collapses to one question about the starting string. If `s` holds no vowel at all, then every substring holds zero vowels — an even count — so Alice, who must delete a substring with an odd number of vowels, has no legal first move and loses immediately.

If the total number of vowels is odd, Alice simply deletes the whole string, and Bob faces an empty string with nothing left to remove. If the total is even but positive, Alice opens by deleting a single vowel character — a one-character substring whose vowel count is 1, still legal for her — which leaves an odd number of vowels behind. From there she mirrors Bob forever: his move always removes an even number of vowels (zero included), so the remaining total stays odd after every turn of his, and he can never end the game himself because clearing an odd-count string is not a move he is allowed to make. Every Bob move therefore hands Alice a non-empty string holding at least one vowel, and she answers by deleting it whole.

So Alice wins exactly when some character of `s` is one of `a`, `e`, `i`, `o`, `u`, and one left-to-right scan testing each letter against that set decides the game.

**Complexity:** `O(n)` time, `O(1)` space.
