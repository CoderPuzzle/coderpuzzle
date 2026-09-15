# Unique Email Groups

## Description

You are given an array of strings emails, where each string is a valid email
address.

Two email addresses belong to the same group if both their normalized local
names and normalized domain names are identical.

The normalization rules are as follows:

The local name is the part before the '@' symbol.

- Ignore all dots '.'.
- Ignore everything after the first '+', if present.
- Convert to lowercase.

The domain name is the part after the '@' symbol.

- Convert to lowercase.

Return an integer denoting the number of unique email groups after
normalization.

### Example 1

```text
Input: emails = ["test.email+alex@leetcode.com", "test.e.mail+bob.cathy@leetcode.com", "testemail+david@lee.tcode.com"]
Output: 2
Explanation:
Email: test.email+alex@leetcode.com
  Local: test.email+alex
  Normalized Local: testemail
  Domain: leetcode.com
  Normalized Domain: leetcode.com
  Final Email: testemail@leetcode.com

Email: test.e.mail+bob.cathy@leetcode.com
  Local: test.e.mail+bob.cathy
  Normalized Local: testemail
  Domain: leetcode.com
  Normalized Domain: leetcode.com
  Final Email: testemail@leetcode.com

Email: testemail+david@lee.tcode.com
  Local: testemail+david
  Normalized Local: testemail
  Domain: lee.tcode.com
  Normalized Domain: lee.tcode.com
  Final Email: testemail@lee.tcode.com

Unique emails are ["testemail@leetcode.com", "testemail@lee.tcode.com"]. Thus, the answer is 2.
```

### Example 2

```text
Input: emails = ["A@B.com", "a@b.com", "ab+xy@b.com", "a.b@b.com"]
Output: 2
Explanation:
Email: A@B.com
  Local: A
  Normalized Local: a
  Domain: B.com
  Normalized Domain: b.com
  Final Email: a@b.com

Email: a@b.com
  Local: a
  Normalized Local: a
  Domain: b.com
  Normalized Domain: b.com
  Final Email: a@b.com

Email: ab+xy@b.com
  Local: ab+xy
  Normalized Local: ab
  Domain: b.com
  Normalized Domain: b.com
  Final Email: ab@b.com

Email: a.b@b.com
  Local: a.b
  Normalized Local: ab
  Domain: b.com
  Normalized Domain: b.com
  Final Email: ab@b.com

Unique emails are ["a@b.com", "ab@b.com"]. Thus, the answer is 2.
```

### Example 3

```text
Input: emails = ["a.b+c.d+e@DoMain.com", "ab+xyz@domain.com", "ab@domain.com"]
Output: 1
Explanation:
Email: a.b+c.d+e@DoMain.com
  Local: a.b+c.d+e
  Normalized Local: ab
  Domain: DoMain.com
  Normalized Domain: domain.com
  Final Email: ab@domain.com

Email: ab+xyz@domain.com
  Local: ab+xyz
  Normalized Local: ab
  Domain: domain.com
  Normalized Domain: domain.com
  Final Email: ab@domain.com

Email: ab@domain.com
  Local: ab
  Normalized Local: ab
  Domain: domain.com
  Normalized Domain: domain.com
  Final Email: ab@domain.com

All emails normalize to "ab@domain.com". Thus, the answer is 1.
```

### Constraints

- `1 <= emails.length <= 1000`
- `1 <= emails[i].length <= 100`
- `emails[i]` consists of lowercase and uppercase English letters, digits,
  and the characters `'.'`, `'+'`, and `'@'`.
- Each `emails[i]` contains exactly one `'@'` character.
- All local and domain names are non-empty; local names do not start with
  `'+'`.
- Domain names end with the `".com"` suffix and contain at least one
  character before `".com"`.

## Hints

### Hint 1

Simulate the normalization process as described, and use an unordered set (or
set) to keep track of unique normalized email addresses.
