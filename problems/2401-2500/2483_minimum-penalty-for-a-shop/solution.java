class Solution {

    public int bestClosingTime(String customers) {
        // penalty at closing hour j = (#'N' in customers[:j]) + (#'Y' in customers[j:])
        int prefixN = 0;
        int suffixY = 0;
        for (int i = 0; i < customers.length(); i++) {
            if (customers.charAt(i) == 'Y') suffixY++;
        }
        int bestJ = 0;
        int bestPenalty = prefixN + suffixY;
        for (int j = 1; j <= customers.length(); j++) {
            if (customers.charAt(j - 1) == 'N') prefixN++;
            else suffixY--;
            int penalty = prefixN + suffixY;
            if (penalty < bestPenalty) {
                bestPenalty = penalty;
                bestJ = j;
            }
        }
        return bestJ;
    }
}
