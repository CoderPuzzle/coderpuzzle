class Solution:
    def longestBeautifulSubstring(self, word: str) -> int:
        # One pass over vowel runs. A beautiful substring is a maximal
        # run of non-decreasing vowels containing all five; extend the run
        # while the next vowel is >= the current one, then score it.
        ORDER = "aeiou"
        best = 0
        n = len(word)
        i = 0
        while i < n:
            if word[i] != "a":
                i += 1
                continue
            j = i + 1
            seen = {word[i]}
            while j < n and word[j] >= word[j - 1]:
                seen.add(word[j])
                j += 1
            if seen == set(ORDER):
                best = max(best, j - i)
            i = j if j > i else i + 1
        return best
