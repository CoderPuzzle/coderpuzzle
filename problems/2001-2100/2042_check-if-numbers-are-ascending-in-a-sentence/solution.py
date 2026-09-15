class Solution:
    def areNumbersAscending(self, s: str) -> bool:
        previous = 0

        for token in s.split():
            if token[0].isdigit():
                current = int(token)
                if current <= previous:
                    return False
                previous = current

        return True
