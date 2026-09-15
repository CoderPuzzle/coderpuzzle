from typing import List


class Solution:
    def scoreValidator(self, events: List[str]) -> List[int]:
        # Single left-to-right pass. Only "W" moves the counter, so it alone
        # can trigger the stop-at-10 rule; scoring events never stop anything.
        score = 0
        counter = 0
        for event in events:
            if event == "W":
                counter += 1
            elif event == "WD" or event == "NB":
                score += 1
            else:
                score += int(event)
            # Events after the counter reaches 10 are ignored entirely.
            if counter == 10:
                break
        return [score, counter]
