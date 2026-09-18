class Master;

class Solution {
  public:
    void findSecretWord(Master &interrogator, std::vector<std::string> wordlist) {
        auto matches = [](const std::string &a, const std::string &b) {
            int count = 0;
            int n = static_cast<int>(std::min(a.size(), b.size()));
            for (int i = 0; i < n; ++i) {
                if (a[i] == b[i])
                    count++;
            }
            return count;
        };
        std::vector<std::string> candidates = wordlist;
        while (!candidates.empty()) {
            // Pick the word whose worst-case surviving group is smallest:
            // bucket every candidate by its agreement with the candidate
            // under review, and keep the candidate with the smallest largest
            // bucket (minimax elimination).
            std::string best = candidates[0];
            int bestWorst = static_cast<int>(candidates.size()) + 1;
            for (const std::string &word : candidates) {
                int groups[7] = {0, 0, 0, 0, 0, 0, 0};
                for (const std::string &other : candidates)
                    groups[matches(word, other)]++;
                int worst = 0;
                for (int group : groups)
                    worst = std::max(worst, group);
                if (worst < bestWorst) {
                    best = word;
                    bestWorst = worst;
                }
            }
            int score = interrogator.guess(best);
            if (score == static_cast<int>(best.size())) {
                return;
            }
            std::vector<std::string> survivors;
            for (const std::string &word : candidates) {
                if (matches(word, best) == score)
                    survivors.push_back(word);
            }
            candidates = std::move(survivors);
        }
    }
};
