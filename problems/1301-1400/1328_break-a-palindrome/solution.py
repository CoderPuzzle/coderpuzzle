class Solution:
    def breakPalindrome(self, palindrome: str) -> str:
        # One change in the first half decides lexicographic order; lower the
        # first non-'a' there to 'a'. All-'a' halves force the last spot to
        # 'b'; length 1 can never stop being a palindrome.
        n = len(palindrome)
        if n == 1:
            return ""
        text = list(palindrome)
        for i in range(n // 2):
            if text[i] != "a":
                text[i] = "a"
                return "".join(text)
        text[-1] = "b"
        return "".join(text)
