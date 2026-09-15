class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Two pointers walk inward from both ends. Each skips the characters
        # the rules erase, so one lowercase comparison per surviving pair
        # decides the answer and no filtered copy of s is ever built.
        left, right = 0, len(s) - 1
        while left < right:
            # Punctuation and spaces are removed by the normalization, so they
            # can never break the mirror: step past them.
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
            # Comparing lowercased characters applies the case rule in place;
            # digits lower to themselves, so one path covers both kinds.
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True
