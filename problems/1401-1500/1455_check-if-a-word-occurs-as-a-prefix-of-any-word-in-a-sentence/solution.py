class Solution:
    def isPrefixOfWord(self, sentence: str, searchWord: str) -> int:
        for index, word in enumerate(sentence.split(" "), start=1):
            if word.startswith(searchWord):
                return index
        return -1
