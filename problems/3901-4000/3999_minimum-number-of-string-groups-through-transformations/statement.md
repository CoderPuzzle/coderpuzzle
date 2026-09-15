# Minimum Number of String Groups Through Transformations

## Description

You are given an array of strings words.

Define a transformation on a string s as follows:

    Let E be the subsequence of characters at even indices of s.
    Let O be the subsequence of characters at odd indices of s.
    Independently cyclically shift E and O by any number of positions to the right, possibly zero.
    Reconstruct the string by placing the shifted E characters back into even indices and the shifted O characters back into odd indices.

Two strings are equivalent if one can be transformed into the other by a single transformation.

Partition words into the minimum number of groups such that:

    Every string belongs to exactly one group.
    Every pair of strings in the same group are equivalent.

Return an integer denoting the minimum number of groups.

### Example 1

Input: words = ["ntgwz","zwntg"]

Output: 1

Explanation:

    For "ntgwz", the even-index subsequence is "ngz" and the odd-index subsequence is "tw".
    Shift "ngz" right by 1 position to obtain "zng", and shift "tw" right by 1 position to obtain "wt".
    After reconstructing the string, we obtain "zwntg".
    Therefore, both strings are equivalent and belong to the same group.

### Example 2

Input: words = ["abc","cab","bac","acb","bca","cba"]

Output: 3

Explanation:

The strings can be partitioned into the following groups:

    ["abc","cba"]
    ["cab","bac"]
    ["acb","bca"]

### Example 3

Input: words = ["leet","abb","bab","deed","edde","code","bba"]

Output: 5

Explanation:

The strings can be partitioned into the following groups:

    ["abb","bba"]
    ["deed","edde"]
    ["leet"]
    ["bab"]
    ["code"]

All pairs of strings in each group are equivalent.

### Constraints

    1 <= words.length <= 10⁵
    1 <= words[i].length <= 5 * 10⁵
    The sum of words[i].length does not exceed 5 * 10⁵.
    words[i] consist of lowercase English letters.

## Hints

### Hint 1

Separate each word into the characters at even indices and the characters at odd indices.

### Hint 2

Two words are equivalent if their even-index subsequences are cyclic shifts of each other and their odd-index subsequences are cyclic shifts of each other.

### Hint 3

For each subsequence, compute a canonical representative of its cyclic rotations, such as its lexicographically smallest cyclic rotation. This can be found efficiently using Booth's algorithm, Duval's algorithm, or even a suffix-array-based approach on the doubled string etc.

### Hint 4

Use the pair of canonical representatives as the signature of the word. The answer is the number of distinct signatures.
