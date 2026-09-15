class Solution:
    def wordPatternMatch(self, pattern: str, s: str) -> bool:
        # Depth-first walk over pattern positions with a two-way map:
        # forward (char -> word) keeps every later occurrence of the char
        # honest, backward (word -> char) enforces the bijection.
        char_to_word = {}
        word_to_char = {}

        def match(pi: int, si: int) -> bool:
            if pi == len(pattern):
                # Every char placed: a match only when s is fully consumed.
                return si == len(s)
            if si == len(s):
                # Chars remain but s is exhausted; mappings are non-empty.
                return False
            char = pattern[pi]
            if char in char_to_word:
                # A char already mapped must reproduce its word exactly.
                word = char_to_word[char]
                if not s.startswith(word, si):
                    return False
                return match(pi + 1, si + len(word))
            for end in range(si + 1, len(s) + 1):
                word = s[si:end]
                if word in word_to_char:
                    # Bijection: the word is already another char's image.
                    continue
                char_to_word[char] = word
                word_to_char[word] = char
                if match(pi + 1, end):
                    return True
                del char_to_word[char]
                del word_to_char[word]
            return False

        return match(0, 0)
