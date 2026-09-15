class Solution:
    def validWordAbbreviation(self, word: str, abbr: str) -> bool:
        # Two indexes walk word and abbr together: a letter must match
        # exactly, a digit run is one skip, and both walks must end together.
        i = j = 0
        while i < len(word) and j < len(abbr):
            if "0" <= abbr[j] <= "9":
                # A digit run may not open with '0': that is a leading zero
                # (and a zero skip would replace an empty substring).
                if abbr[j] == "0":
                    return False
                skip = 0
                # Consume the whole run: "12" and "55" are single skips, so
                # adjacent replacements can never masquerade as two.
                while j < len(abbr) and "0" <= abbr[j] <= "9":
                    skip = skip * 10 + int(abbr[j])
                    j += 1
                i += skip
            else:
                if word[i] != abbr[j]:
                    return False
                i += 1
                j += 1
        # A skip past the end, leftover word, or leftover abbr all fail here.
        return i == len(word) and j == len(abbr)
