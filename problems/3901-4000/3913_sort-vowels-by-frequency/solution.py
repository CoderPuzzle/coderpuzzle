class Solution:
    def sortVowels(self, s: str) -> str:
        vowels = "aeiou"
        index = {ch: i for i, ch in enumerate(vowels)}
        counts = [0] * 5
        first = [len(s)] * 5
        for position, ch in enumerate(s):
            if ch in index:
                slot = index[ch]
                counts[slot] += 1
                first[slot] = min(first[slot], position)

        order = sorted(range(5), key=lambda slot: (-counts[slot], first[slot]))
        arranged = "".join(vowels[slot] * counts[slot] for slot in order)
        answer = list(s)
        pointer = 0
        for position, ch in enumerate(answer):
            if ch in index:
                answer[position] = arranged[pointer]
                pointer += 1
        return "".join(answer)
