from typing import List, Optional


class Solution:
    def exclusiveTime(self, n: int, logs: List[str]) -> List[int]:
        res = [0] * n
        stack = []  # [func_id, resume_time]
        for log in logs:
            fid, action, ts = log.split(":")
            fid, ts = int(fid), int(ts)
            if action == "start":
                if stack:
                    res[stack[-1][0]] += ts - stack[-1][1]
                stack.append([fid, ts])
            else:
                fid_on_top, start = stack.pop()
                res[fid_on_top] += ts - start + 1
                if stack:
                    stack[-1][1] = ts + 1
        return res
