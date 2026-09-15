from typing import List


class Solution:
    def countMentions(self, numberOfUsers: int, events: List[List[str]]) -> List[int]:
        # Chronological sweep: order events by timestamp, offline events
        # ahead of messages at the same moment (a status change applies
        # before any message sharing its timestamp). Each user's return
        # time is the offline timestamp + 60; a message at time t sees
        # the user once that return time has passed.
        ordered = sorted(events, key=lambda e: (int(e[1]), 0 if e[0] == "OFFLINE" else 1))
        mentions = [0] * numberOfUsers
        back_at = [0] * numberOfUsers
        for kind, raw_time, payload in ordered:
            time = int(raw_time)
            if kind == "OFFLINE":
                back_at[int(payload)] = time + 60
                continue
            for token in payload.split():
                if token == "ALL":
                    for user in range(numberOfUsers):
                        mentions[user] += 1
                elif token == "HERE":
                    for user in range(numberOfUsers):
                        if back_at[user] <= time:
                            mentions[user] += 1
                else:
                    mentions[int(token[2:])] += 1
        return mentions
