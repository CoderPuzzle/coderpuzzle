class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        # The pattern holds under a bijection: each letter names exactly one
        # word, and no two letters share a word. Each clause is one map,
        # checked together in a single pass over letter/word pairs.
        words = s.split(" ")
        if len(pattern) != len(words):
            # With counts different, letters and words cannot pair one-to-one.
            return False
        letter_to_word = {}
        word_to_letter = {}
        for letter, word in zip(pattern, words):
            # One branch per direction: the letter already names a different
            # word, or the word is already claimed by a different letter.
            if letter in letter_to_word and letter_to_word[letter] != word:
                return False
            if word in word_to_letter and word_to_letter[word] != letter:
                return False
            letter_to_word[letter] = word
            word_to_letter[word] = letter
        return True
