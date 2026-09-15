# Making File Names Unique

## Description

Given an array of strings `names` of size `n`. You will create `n`
folders in your file system such that, at the `i`-th minute, you will
create a folder with the name `names[i]`.

Since two files cannot have the same name, if you enter a folder name
that was previously used, the system will add a suffix to its name in the
form of `(k)`, where `k` is the smallest positive integer such that the
obtained name remains unique.

Return an array of strings of length `n` where `ans[i]` is the actual
name the system will assign to the `i`-th folder when you create it.

### Example 1

```text
Input: names = ["pes","fifa","gta","pes(2019)"]
Output: ["pes","fifa","gta","pes(2019)"]
Explanation: None of the requested names collides with an earlier one,
so every name stays as it is.
```

### Example 2

```text
Input: names = ["gta","gta(1)","gta","avalon"]
Output: ["gta","gta(1)","gta(2)","avalon"]
Explanation: The second "gta" is reserved, and "gta(1)" is taken too,
so the system picks k = 2 producing "gta(2)".
```

### Example 3

```text
Input: names = ["onepiece","onepiece(1)","onepiece(2)","onepiece(3)","onepiece"]
Output: ["onepiece","onepiece(1)","onepiece(2)","onepiece(3)","onepiece(4)"]
Explanation: When the last folder is created, the smallest valid k is 4.
```

### Constraints

- `1 <= names.length <= 5 * 10⁴`
- `1 <= names[i].length <= 20`
- `names[i]` consists of lowercase English letters, digits, and/or round
  brackets.

## Hints

### Hint 1

Keep a map of each name and the smallest valid integer that can be
appended as a suffix to it.

### Hint 2

If the name is not present in the map, you can use it without adding any
suffixes.

### Hint 3

If the name is present in the map, append the smallest proper suffix, and
add the new name to the map.
