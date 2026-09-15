from typing import List


class Solution:
    def killProcess(self, pid: List[int], ppid: List[int], kill: int) -> List[int]:
        # Killing a process kills its whole subtree, so group the processes
        # by parent — children of one parent keep pid-array order — and walk
        # down from kill. The queue doubles as the answer: every process
        # enters it in exactly the required breadth-first order, so each
        # dequeue is one more confirmed kill.
        children = {}
        for child, parent in zip(pid, ppid):
            children.setdefault(parent, []).append(child)
        killed = [kill]
        head = 0
        while head < len(killed):
            killed.extend(children.get(killed[head], ()))
            head += 1
        return killed
