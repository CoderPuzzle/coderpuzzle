class Solution:
    def transformStr(self, s: str, strs: list[str]) -> list[bool]:
        total = s.count("1")
        out = []
        for q in strs:
            need = total - q.count("1")
            if need < 0 or need > q.count("?"):
                out.append(False)
                continue
            chosen = set()
            for i in range(len(q) - 1, -1, -1):
                if q[i] == "?" and need:
                    chosen.add(i)
                    need -= 1
            a = b = 0
            ok = True
            for i, x in enumerate(q):
                a += s[i] == "1"
                b += x == "1" or i in chosen
                ok = ok and b <= a
            out.append(ok)
        return out
