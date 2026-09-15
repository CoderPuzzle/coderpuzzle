class Solution:
    def countOfSubstrings(self, word: str, k: int) -> int:
        # Count windows with all five vowels and >= c consonants, for c = k and
        # c = k + 1; their difference is the number with exactly k consonants.
        # For each left end l, grow r until the window first qualifies; that
        # minimal right end never moves backwards, so every character enters
        # and leaves the window once — linear overall.
        n = len(word)
        vowels = set("aeiou")

        def at_least(need):
            have = [0] * 26
            distinct = 0
            cons = 0
            total = 0
            r = 0
            for l in range(n):
                # Grow the window until it has every vowel and >= need consonants.
                while r < n and (distinct < 5 or cons < need):
                    c = ord(word[r]) - 97
                    if word[r] in vowels:
                        if have[c] == 0:
                            distinct += 1
                    else:
                        cons += 1
                    have[c] += 1
                    r += 1
                if distinct < 5 or cons < need:
                    # No window starting at l (or any later l) can qualify.
                    break
                total += n - (r - 1)
                # Drop word[l] before moving to the next left end.
                c = ord(word[l]) - 97
                have[c] -= 1
                if word[l] in vowels:
                    if have[c] == 0:
                        distinct -= 1
                else:
                    cons -= 1
            return total

        return at_least(k) - at_least(k + 1)
