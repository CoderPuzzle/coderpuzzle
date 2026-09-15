class Solution {
  public:
    string nearestPalindromic(string n) {
        // A palindrome is fixed by its first half, so the palindromes
        // nearest n nearly share n's own half: mirror the half, and the
        // half +/- 1, for at most three same-width candidates. The +/- 1
        // step can leave the width (10...0 decremented, 9...9 incremented);
        // those neighbors are the boundary candidates 10^(L-1) - 1 (all 9s,
        // one digit shorter) and 10^L + 1 (1, zeros, 1).
        int length = n.size();
        int half = (length + 1) / 2;
        long long prefix = stoll(n.substr(0, half));
        vector<string> candidates;
        for (int delta = -1; delta <= 1; delta++) {
            string shifted = to_string(prefix + delta);
            // A half that no longer has exactly `half` digits would mirror
            // onto leading zeros - the boundary candidates own that ground.
            if ((int)shifted.size() != half || (shifted == "0" && length > 1)) {
                continue;
            }
            string head = shifted.substr(0, length - half);
            reverse(head.begin(), head.end());
            candidates.push_back(shifted + head);
        }
        candidates.push_back(length == 1 ? "0" : string(length - 1, '9'));
        candidates.push_back("1" + string(length - 1, '0') + "1");

        // Everything fits a signed 64-bit integer: n is below 10^18, the
        // widest candidate is 10^18 + 1, and no distance passes
        // 9 * 10^17 + 1 - an order of magnitude inside long long's
        // 9.22 * 10^18 ceiling.
        long long value = stoll(n);
        string best;
        long long bestValue = 0;
        long long bestDistance = 0;
        for (string &candidate : candidates) {
            long long candidateValue = stoll(candidate);
            if (candidateValue == value) {
                continue; // n itself never counts
            }
            long long distance = candidateValue > value ? candidateValue - value : value - candidateValue;
            if (best.empty() || distance < bestDistance || (distance == bestDistance && candidateValue < bestValue)) {
                best = candidate;
                bestValue = candidateValue;
                bestDistance = distance;
            }
        }
        return best;
    }
};
