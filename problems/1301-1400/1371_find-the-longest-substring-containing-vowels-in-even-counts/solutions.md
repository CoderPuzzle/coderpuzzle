# Solutions — Find the Longest Substring Containing Vowels in Even Counts

## Prefix XOR of vowel parity

A substring has every vowel an even number of times exactly when the vowel counts at its two ends have identical parity. Encode the parity of the five vowels `a, e, i, o, u` as five bits of one number (values 1, 2, 4, 8, 16), and let `mask` be the running XOR of the letters seen so far — consonants leave it untouched. Then for indices `l < r`, the substring `s[l + 1..r]` has all vowel counts even precisely when `mask[l] == mask[r]`, because XOR-ing the two prefix states cancels every bit that appears an even number of times inside the window.

To find the longest such substring in one pass, remember for each of the 32 possible mask values the first index where it occurred, in a `first` array initialized to `-2` (meaning "not yet seen"), with `first[0] = -1` so that a prefix of the string itself qualifies. At each position `i`, after toggling the vowel bit, if this mask has been seen before at index `first[mask]`, the stretch between them is a candidate of length `i - first[mask]`; otherwise record `i` as the mask's first occurrence. Because only the earliest occurrence can maximize the length, later repeats never overwrite the entry.

The scan handles edge cases structurally: a string with no vowels keeps `mask = 0` throughout, making the whole string the answer (its length is recovered via `first[0] = -1` at the last index), and strings whose best window is empty of any valid pair simply never update `best` past its initial 0.

The alphabet of masks is fixed at 32, so the table is constant extra space and each character costs O(1) work.

**Complexity:** `O(n)` time, `O(1)` space (a fixed 32-entry table).
