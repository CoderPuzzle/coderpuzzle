# Solutions — Count Valid Word Occurrences

## Joiner-aware scan

Scan the concatenated string once and build the current word character by
character. A lowercase letter is always part of a word. A hyphen is kept only
when it has a lowercase English letter immediately before and after it;
otherwise it closes the current word and acts as a separator. Spaces and any
other non-letter characters also close the current word.

Store completed words in a hash counter. Each query is answered with a direct
lookup, with zero for a word that never appears.

**Complexity:** `O(total length of chunks + total length of queries)` time
and `O(number of distinct words)` space.
