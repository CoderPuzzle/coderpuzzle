class Solution:
    def reversePrefix(self, word: str, ch: str) -> str:
        # Find the first occurrence of ch; if it is absent the word is
        # returned unchanged. Otherwise flip word[0..i] with a slice
        # reversal and keep the rest of the string in order.
        i = word.find(ch)
        if i == -1:
            return word
        return word[: i + 1][::-1] + word[i + 1 :]
