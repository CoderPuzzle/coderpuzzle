class Solution:
    def minimizeConcatenatedLength(self, words: List[str]) -> int:
        # dp[first][last] = shortest length of a concatenation of the words
        # processed so far starting with `first` and ending with `last`.
        inf = float("inf")
        dp = [[inf] * 26 for _ in range(26)]
        first_word = words[0]
        dp[ord(first_word[0]) - 97][ord(first_word[-1]) - 97] = len(first_word)
        for word in words[1:]:
            word_first = ord(word[0]) - 97
            word_last = ord(word[-1]) - 97
            length = len(word)
            ndp = [[inf] * 26 for _ in range(26)]
            for f in range(26):
                row = dp[f]
                for l in range(26):
                    current = row[l]
                    if current == inf:
                        continue
                    # Append on the right: seam merges when our last char
                    # equals the word's first char.
                    appended = current + length
                    if l == word_first:
                        appended -= 1
                    if appended < ndp[f][word_last]:
                        ndp[f][word_last] = appended
                    # Prepend on the left: seam merges when the word's last
                    # char equals our first char.
                    prepended = current + length
                    if word_last == f:
                        prepended -= 1
                    if prepended < ndp[word_first][l]:
                        ndp[word_first][l] = prepended
            dp = ndp
        return min(min(row) for row in dp)
