# Solutions — Capitalize the Title

## Normalize each word

Split the title at its single spaces and lowercase every word first. Words of length one or two are then complete, while a longer word needs only its first letter changed back to uppercase.

Join the transformed words with one space. Processing each character a constant number of times preserves every word and separator while replacing only letter case.

**Complexity:** `O(n)` time and `O(n)` output space.
