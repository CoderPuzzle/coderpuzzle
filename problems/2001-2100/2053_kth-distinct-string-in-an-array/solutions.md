# Solutions — Kth Distinct String in an Array

## Count first, preserve order second

Count every string in a hash map during one pass. A second pass over `arr` in
its original order then visits the distinct strings exactly where they first
and only occur. Decrement `k` only when a string's frequency is one; when it
reaches zero, that string is the requested answer. If the scan ends first,
fewer than `k` distinct strings exist, so return `""`.

Separating counting from selection is what preserves the stated ordering while
still recognizing duplicates that occur later in the array. Strings seen two
or more times are skipped everywhere, regardless of whether their duplicates
appear before or after a possible answer.

**Complexity:** `O(C)` expected time and `O(D)` space, where `C` is the total number of input characters and `D` is the total characters across distinct map keys.
