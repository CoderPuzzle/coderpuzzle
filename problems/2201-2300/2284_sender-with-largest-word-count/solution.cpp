class Solution {
  public:
    string largestWordCount(vector<string> &messages, vector<string> &senders) {
        unordered_map<string, int> counts;
        for (int index = 0; index < static_cast<int>(messages.size()); ++index) {
            int words = 1;
            for (char letter : messages[index]) {
                if (letter == ' ')
                    ++words;
            }
            counts[senders[index]] += words;
        }
        string bestSender;
        int bestCount = -1;
        for (const auto &entry : counts) {
            if (entry.second > bestCount || (entry.second == bestCount && entry.first > bestSender)) {
                bestCount = entry.second;
                bestSender = entry.first;
            }
        }
        return bestSender;
    }
};
