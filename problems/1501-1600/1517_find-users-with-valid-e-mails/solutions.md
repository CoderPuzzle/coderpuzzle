# Solutions — Find Users With Valid E-Mails

## Split domain and prefix, validate each half

The rule has two independent parts — a fixed literal domain and a
character-restricted prefix — so the query splits each `mail` value at the
13-character boundary before `@leetcode.com` and validates the two halves
separately. `substr(mail, -13)` pulls the trailing 13 characters and
compares them against `'@leetcode.com'` with `=`, which SQLite evaluates
byte-for-byte, so an uppercase host or the wrong domain both fail; `substr`
never errors on a too-short value, it just returns fewer characters (or
none), so a bare-domain or otherwise short `mail` falls through to a
domain comparison that cannot match.

The remaining prefix is validated with two `GLOB` checks rather than one:
`local_part GLOB '[a-zA-Z]*'` anchors the first character to a letter, and
`local_part NOT GLOB '*[^a-zA-Z0-9_.-]*'` rejects any character — anywhere
in the prefix, including a stray `@` from a second `@` sign — that falls
outside letters, digits, underscore, period, and dash. GLOB has no
"repeat this class" quantifier the way a regex would, so the negated-class
scan stands in for it: a prefix built entirely from the allowed characters
has nothing left for `[^a-zA-Z0-9_.-]` to match. An empty prefix (the mail
is just `'@leetcode.com'`) fails the first check outright, since an empty
string cannot satisfy a pattern that requires one leading letter. Each row
is scanned once for its domain suffix and prefix character set,
independent of every other row.

**Complexity:** `O(n)` time, `O(1)` auxiliary space, for `n` rows in
`Users`.
