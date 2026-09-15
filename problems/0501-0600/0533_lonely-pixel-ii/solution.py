from typing import List


class Solution:
    def findBlackPixel(self, picture: List[List[str]], target: int) -> int:
        # Rule 2 asks every row carrying a black pixel in column c to be an
        # exact copy of row r, so rows only interact through their content:
        # identical rows form a class keyed by the joined row string.
        m = len(picture)
        n = len(picture[0])
        classOfKey = {}
        classRowCount = []
        rowClass = [0] * m
        colCount = [0] * n
        for i in range(m):
            key = "".join(picture[i])
            if key not in classOfKey:
                classOfKey[key] = len(classRowCount)
                classRowCount.append(picture[i].count("B"))
            rowClass[i] = classOfKey[key]
            for j in range(n):
                if picture[i][j] == "B":
                    colCount[j] += 1
        # blacks[j][k]: how many black cells column j carries from class k.
        blacks = [[0] * len(classRowCount) for _ in range(n)]
        for i in range(m):
            for j in range(n):
                if picture[i][j] == "B":
                    blacks[j][rowClass[i]] += 1
        # A column pays out exactly target pixels when its target blacks all
        # come from one class (rule 2) whose rows hold target blacks (rule 1).
        total = 0
        for j in range(n):
            if colCount[j] != target:
                continue
            for k in range(len(classRowCount)):
                if blacks[j][k] == target and classRowCount[k] == target:
                    total += target
        return total
