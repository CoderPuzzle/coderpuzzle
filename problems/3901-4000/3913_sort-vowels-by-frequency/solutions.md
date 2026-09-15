# Solutions — Sort Vowels by Frequency

## Count vowel types, then refill vowel positions

Count each of the five vowel types and record where each first appears. Sort
those five types by decreasing count, breaking ties by increasing first
position, then concatenate every occurrence of each type in that order. This
produces exactly the ordered vowel stream required by the statement.

Walk the original string once more. Leave consonants untouched and replace
each vowel position with the next character from the ordered stream. Only
five types are sorted, so that step is constant-sized; the work is dominated
by the passes over the string and the returned character buffer.

**Complexity:** `O(n)` time, `O(n)` space.
