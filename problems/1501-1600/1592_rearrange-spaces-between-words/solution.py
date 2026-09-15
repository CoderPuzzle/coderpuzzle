class Solution:
    def reorderSpaces(self, text: str) -> str:
        words = text.split()
        spaces = text.count(" ")
        if len(words) == 1:
            # A single word: every space is trailing.
            return words[0] + " " * spaces
        # Distribute spaces as evenly as possible between the gaps, and
        # push whatever does not divide evenly to the end.
        between, extra = divmod(spaces, len(words) - 1)
        return (" " * between).join(words) + " " * extra
