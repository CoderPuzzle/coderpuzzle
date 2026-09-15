# Minimum Cost to Convert String III

## Description

You are given two strings, source and target.

You are also given a 2D string array rules, where rules[i] = [patterni, replacementi], and an integer array costs, where costs[i] is the base cost of applying rules[i]. Both arrays have the same length. Additionally, patterni and replacementi have the same length.

You may apply any rule any number of times. Each rule application works as follows:

    Choose an index l such that the range of positions from l to l + patterni.length - 1 exists in the current string and none of these positions has been used in a previous rule application.
    For each index j, the character patterni[j] must either be equal to the current character at position l + j, or be '*'.
    Replace the characters in this range with replacementi. The replacement is used exactly as given and does not contain wildcards.
    The cost of this rule application is costs[i] plus the number of '*' characters in patterni.
    Once a character position has been used in a rule application, it cannot be used in any later rule application.

Since every patterni and replacementi have the same length, character positions are preserved after every rule application.

Return the minimum total cost required to transform source into target. If it is impossible, return -1.

### Example 1

Input: source = "hello", target = "world", rules = [["he","wo"],["llo","rld"]], costs = [3,4]

Output: 7

Explanation:

    Apply rules[0] to replace "he" with "wo" at cost 3, so the string becomes "wollo".
    Apply rules[1] to replace "llo" with "rld" at cost 4, so the string becomes "world".
    The total cost is 3 + 4 = 7.

### Example 2

Input: source = "cat", target = "dog", rules = [["c*t","dog"]], costs = [2]

Output: 3

Explanation:

    Apply rules[0] to replace "cat" with "dog". The wildcard '*' matches 'a', adding 1 to the base cost 2.
    The total cost is 2 + 1 = 3.

### Example 3

Input: source = "test", target = "next", rules = [["*e*t","next"]], costs = [4]

Output: 6

Explanation:

    Apply rules[0] to replace "test" with "next". The first wildcard matches 't' and the second wildcard matches 's', adding 2 to the base cost 4.
    The total cost is 4 + 2 = 6.

### Example 4

Input: source = "ab", target = "bc", rules = [["a*","bd"]], costs = [9]

Output: -1

Explanation:

No sequence of rule applications can transform source into target, so the answer is -1.

### Constraints

    1 <= source.length == target.length <= 5000
    source and target consist of lowercase English letters.
    1 <= rules.length == costs.length <= 200
    rules[i] = [patterni, replacementi]
    1 <= patterni.length == replacementi.length <= 20
    patterni contains at least one lowercase English letter and at most 5 '*' characters.
    replacementi contains only lowercase English letters.
    1 <= costs[i] <= 1000

## Hints

### Hint 1

Because used ranges cannot overlap and all replacements preserve length, each position is either left unchanged or belongs to exactly one applied rule.

### Hint 2

Use dynamic programming over prefixes. Let dp[i] be the minimum cost to transform the first i characters of source into the first i characters of target.

### Hint 3

If source[i] == target[i], you may leave position i unchanged and update dp[i + 1].

### Hint 4

For each rule starting at position i, check whether its pattern matches source[i..i + len - 1] using '*' as a wildcard, and whether its replacement equals target[i..i + len - 1].

### Hint 5

If both checks pass, update dp[i + len] using the rule cost plus the number of '*' characters in its pattern.
