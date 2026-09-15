class Solution:
    def minimumChairs(self, s: str) -> int:
        people = 0
        chairs = 0
        for event in s:
            if event == "E":
                people += 1
                if people > chairs:
                    chairs = people
            else:
                people -= 1
        return chairs
