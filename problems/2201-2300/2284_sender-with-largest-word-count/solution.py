from typing import List


class Solution:
    def largestWordCount(self, messages: List[str], senders: List[str]) -> str:
        counts = {}
        for message, sender in zip(messages, senders):
            counts[sender] = counts.get(sender, 0) + message.count(" ") + 1
        best_sender = ""
        best_count = -1
        for sender, count in counts.items():
            if count > best_count or (count == best_count and sender > best_sender):
                best_count = count
                best_sender = sender
        return best_sender
