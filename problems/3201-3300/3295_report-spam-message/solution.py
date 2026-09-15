class Solution:
    def reportSpam(self, message: List[str], bannedWords: List[str]) -> bool:
        # A word is banned or it is not: collapse bannedWords into a hash set
        # (internal duplicates collapse harmlessly). Scan the message counting
        # every occurrence that lands in the set — the same banned word twice
        # in the message counts twice — and stop as soon as two matches have
        # been seen; on a 10^5-word message the early exit can skip the rest.
        banned = set(bannedWords)
        count = 0
        for word in message:
            if word in banned:
                count += 1
                if count == 2:
                    return True
        return False
