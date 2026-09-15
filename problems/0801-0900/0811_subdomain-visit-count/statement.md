# Subdomain Visit Count

## Description

A website domain such as "discuss.leetcode.com" consists of subdomains at
several levels: at the top level there is "com", one level down
"leetcode.com", and at the lowest level "discuss.leetcode.com". When we
visit a domain like "discuss.leetcode.com", we also visit its parent
domains "leetcode.com" and "com" implicitly.

A count-paired domain is a string of one of the two formats
"rep d1.d2.d3" or "rep d1.d2", where rep is the number of visits to the
domain and d1.d2.d3 is the domain itself. For example,
"9001 discuss.leetcode.com" is a count-paired domain indicating that
discuss.leetcode.com was visited 9001 times.

Given an array of count-paired domains `cpdomains`, return an array of the
count-paired domains of each subdomain in the input, with every visit
accumulated. Return the pairs in ascending lexicographic order of the
domain names, so that the answer is uniquely determined.

### Example 1

```text
Input: cpdomains = ["9001 discuss.leetcode.com"]
Output: ["9001 com","9001 discuss.leetcode.com","9001 leetcode.com"]
Explanation: We only have one website domain, "discuss.leetcode.com".
As described above, the subdomains "leetcode.com" and "com" are also
visited, so all three subdomains are visited 9001 times.
```

### Example 2

```text
Input: cpdomains = ["900 google.mail.com","50 yahoo.com","1 intel.mail.com","5 wiki.org"]
Output: ["951 com","900 google.mail.com","1 intel.mail.com","901 mail.com","5 org","5 wiki.org","50 yahoo.com"]
Explanation: We visit "google.mail.com" 900 times, "yahoo.com" 50 times,
"intel.mail.com" once, and "wiki.org" 5 times. For the subdomains,
"mail.com" is visited 900 + 1 = 901 times, "com" is visited
900 + 50 + 1 = 951 times, and "org" is visited 5 times.
```

### Constraints

- `1 <= cpdomain.length <= 100`
- `1 <= cpdomain[i].length <= 100`
- `cpdomain[i]` follows either the `repi d1i.d2i.d3i` format or the
  `repi d1i.d2i` format.
- `repi` is an integer in the range `[1, 10⁴]`.
- `d1i`, `d2i`, and `d3i` consist of lowercase English letters.
