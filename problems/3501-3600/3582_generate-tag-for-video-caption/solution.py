class Solution:
    def generateTag(self, caption: str) -> str:
        # Words are joined in order — the first word fully lowercase,
        # later words with only their first letter capitalized — then the
        # leading '#' plus English letters survive and the tag is cut to
        # 100 characters.
        words = caption.split()
        tag = "#" + "".join(
            word.lower() if index == 0 else word[0].upper() + word[1:].lower() for index, word in enumerate(words)
        )
        kept = ["#"]
        for ch in tag[1:]:
            if "a" <= ch <= "z" or "A" <= ch <= "Z":
                kept.append(ch)
        return "".join(kept[:100])
