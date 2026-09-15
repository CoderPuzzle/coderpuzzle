# Solutions — Find Most Frequent Vowel and Consonant

## Single-pass letter counting

Every occurrence of a letter is interchangeable for this question — only
how many times each letter appears matters — so one scan of `s` into 26
counters captures everything. Scanning letter by letter avoids a second
pass: by the time the loop ends, each bucket already holds its final
frequency.

The answer combines two independent maxima: the largest counter among the
five vowel buckets and the largest among the twenty-one consonant buckets.
A second constant-size pass over the counters picks both. Letters absent
from the string keep their zero count, so the "no vowels / no consonants
counts as 0" rule falls out of the initialization without any special
casing — the maxima simply stay at 0 when a whole category is missing.

Ties need no handling: the statement allows any letter of the maximum
frequency, and the maximum value itself is unique regardless of which
letter attains it.

**Complexity:** `O(n)` time, `O(1)` space (26 counters).
