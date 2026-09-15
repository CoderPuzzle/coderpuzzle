class Solution:
    def toGoatLatin(self, sentence: str) -> str:
        # One pass over the words. Each word is reshaped by its first letter
        # alone: a vowel-initial word survives intact, a consonant-initial
        # word rotates its first letter to the end. Every word then takes
        # "ma" plus one more 'a' per its 1-based index, so the i-th word
        # ends in exactly i 'a's. The vowel test is case-blind: 'I' opens
        # the first example as a vowel.
        vowels = set("aeiouAEIOU")
        words = []
        for index, word in enumerate(sentence.split(), start=1):
            if word[0] not in vowels:
                word = word[1:] + word[0]
            words.append(word + "ma" + "a" * index)
        return " ".join(words)
