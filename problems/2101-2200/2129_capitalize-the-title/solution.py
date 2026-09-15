class Solution:
    def capitalizeTitle(self, title: str) -> str:
        words = []
        for word in title.split(" "):
            lowered = word.lower()
            words.append(lowered if len(word) <= 2 else lowered[0].upper() + lowered[1:])
        return " ".join(words)
