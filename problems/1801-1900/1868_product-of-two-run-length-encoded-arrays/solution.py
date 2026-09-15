class Solution:
    def findRLEArray(self, encoded1: List[List[int]], encoded2: List[List[int]]) -> List[List[int]]:
        # Walk both encodings with running remainders; each step consumes
        # min(remaining1, remaining2) positions and emits one product run,
        # merging into the previous run when the product repeats.
        out: List[List[int]] = []
        i = j = 0
        rem1, rem2 = encoded1[0][1], encoded2[0][1]
        while True:
            take = rem1 if rem1 < rem2 else rem2
            val = encoded1[i][0] * encoded2[j][0]
            if out and out[-1][0] == val:
                out[-1][1] += take
            else:
                out.append([val, take])
            rem1 -= take
            rem2 -= take
            if rem1 == 0:
                i += 1
                if i == len(encoded1):
                    break
                rem1 = encoded1[i][1]
            if rem2 == 0:
                j += 1
                if j == len(encoded2):
                    break
                rem2 = encoded2[j][1]
        return out
