class Solution:
    def discountPrices(self, sentence: str, discount: int) -> str:
        # A word is a price exactly when '$' leads a run of digits only.
        # Whole-dollar prices make price * (100 - discount) the discounted value
        # in exact cents, so integer arithmetic renders the two decimals without
        # ever touching binary floats.
        words = []
        for word in sentence.split(" "):
            if len(word) > 1 and word[0] == "$" and word[1:].isdigit():
                cents = int(word[1:]) * (100 - discount)
                words.append(f"${cents // 100}.{cents % 100:02d}")
            else:
                words.append(word)
        return " ".join(words)
