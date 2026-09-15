# Solutions — Count Vowel Strings in Ranges

## Vowel-String Prefix Sums

Mark each string once — it counts exactly when its first and last
characters are both vowels, a property independent of everything between
them and of any query. Those marks feed a prefix-sum array whose entry
`i+1` holds the number of vowel-strings among `words[0..i]`. Every query
then collapses to a single subtraction `prefix[r+1] - prefix[l]`, so the
answer array is produced in constant time per element regardless of how
wide each range is.

The linear precomputation touches each character at most twice (just its
first and last), comfortably inside the total-length cap of 3·10⁵. All
counts are bounded by `words.length ≤ 10⁵`, far inside 32-bit range in
every language.

**Complexity:** `O(n + q)` time (plus the input length for first/last
character checks), `O(n)` space.
