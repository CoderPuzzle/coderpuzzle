class Solution:
    def numberOfSpecialChars(self, word: str) -> int:
        # Special means every lowercase occurrence sits before the first
        # uppercase one, i.e. last-lower index < first-upper index; both
        # positions per letter are captured in a single pass.
        first_upper = [-1] * 26
        last_lower = [-1] * 26
        for position, ch in enumerate(word):
            if ch.islower():
                last_lower[ord(ch) - ord("a")] = position
            elif first_upper[ord(ch) - ord("A")] == -1:
                first_upper[ord(ch) - ord("A")] = position
        return sum(first_upper[k] != -1 and last_lower[k] != -1 and last_lower[k] < first_upper[k] for k in range(26))
