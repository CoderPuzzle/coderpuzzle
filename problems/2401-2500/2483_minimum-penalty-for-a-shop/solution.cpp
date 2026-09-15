class Solution {
  public:
    int bestClosingTime(string customers) {
        // penalty at closing hour j = (#'N' in customers[:j]) + (#'Y' in customers[j:])
        int prefixN = 0;
        int suffixY = 0;
        for (char c : customers) {
            if (c == 'Y')
                suffixY++;
        }
        int bestJ = 0;
        int bestPenalty = prefixN + suffixY;
        for (int j = 1; j <= (int)customers.size(); j++) {
            if (customers[j - 1] == 'N')
                prefixN++;
            else
                suffixY--;
            int penalty = prefixN + suffixY;
            if (penalty < bestPenalty) {
                bestPenalty = penalty;
                bestJ = j;
            }
        }
        return bestJ;
    }
};
