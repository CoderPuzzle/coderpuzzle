# Solutions — Can Make Palindrome from Substring

## Prefix Parity Bitmasks

Because the substring may be freely rearranged, its order is irrelevant — only the parity of each letter's frequency matters. A multiset can be arranged into a palindrome exactly when at most one letter has an odd count (the potential middle character). A replacement changes one letter into another, flipping two parities at once, so the number of replacements needed to reach a palindromable multiset is `odd / 2` where `odd` is the number of letters with odd frequency: each replacement pairs up two odd letters, and if one odd remains it can sit in the middle.

To answer up to 10^5 queries without scanning each substring, precompute `prefix[i]`, a 26-bit mask of the parities of letter counts in `s[:i]`. Each step is a single XOR: `prefix[i+1] = prefix[i] ^ (1 << (ord(ch) - ord('a')))`, since adding one occurrence toggles that letter's parity. The parity mask of any substring `s[left..right]` is then just `prefix[right + 1] ^ prefix[left]` — letters occurring an even number of times cancel, odd ones survive.

Each query is answered by popcounting that mask and checking `odd // 2 <= k`. Integer division is safe rather than a strict comparison because an odd-length substring may keep one odd letter as its center without spending a replacement, and the `k` budget is per query on the untouched original string. Query results are appended in order and returned.

**Complexity:** `O(n + q)` time, `O(n)` space.
