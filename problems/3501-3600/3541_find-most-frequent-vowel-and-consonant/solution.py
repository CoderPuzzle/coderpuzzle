class Solution:
    def maxFreqSum(self, s: str) -> int:
        # One pass into 26 buckets, then the max over the vowel buckets and
        # the max over the consonant buckets. Missing letters (no vowels or
        # no consonants at all) stay at 0, matching the statement's rule.
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - 97] += 1
        best_vowel = 0
        best_consonant = 0
        for i in range(26):
            if chr(i + 97) in "aeiou":
                best_vowel = max(best_vowel, counts[i])
            else:
                best_consonant = max(best_consonant, counts[i])
        return best_vowel + best_consonant
