# Unique Email Addresses

## Description

Every valid email consists of a local name and a domain name, separated by
the '@' sign. Besides lowercase letters, an email may contain one or more
'.' or '+'.

For example, in "alice@leetcode.com", "alice" is the local name and
"leetcode.com" is the domain name.

If you add periods '.' between some characters in the local name part of an
email address, mail sent there will be forwarded to the same address
without dots in the local name. This rule does not apply to domain names:
"alice.z@leetcode.com" and "alicez@leetcode.com" forward to the same
address.

If you add a plus '+' in the local name, everything after the first plus
sign will be ignored. This allows certain emails to be filtered, and this
rule does not apply to domain names either: "m.y+name@email.com" forwards
to "my@email.com".

It is possible to use both rules at the same time.

Given an array of strings `emails`, where we send one email to each
`emails[i]`, return the number of different addresses that actually
receive mail.

### Example 1

```text
Input: emails = ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]
Output: 2
Explanation: "testemail@leetcode.com" and "testemail@lee.tcode.com" actually receive mail.
```

### Example 2

```text
Input: emails = ["a@leetcode.com","b@leetcode.com","c@leetcode.com"]
Output: 3
```

### Constraints

- `1 <= emails.length <= 100`
- `1 <= emails[i].length <= 100`
- `emails[i]` consists of lowercase English letters, `'+'`, `'.'` and `'@'`.
- Each `emails[i]` contains exactly one `'@'` character.
- All local and domain names are non-empty.
- Local names do not start with a `'+'` character.
- Domain names end with the ".com" suffix.
- Domain names contain at least one character before the ".com" suffix.
