#include <algorithm>
#include <string>
#include <unordered_set>
#include <utility>
#include <vector>

class Solution {
  public:
    std::vector<int> topStudents(std::vector<std::string> &positive_feedback,
                                 std::vector<std::string> &negative_feedback, std::vector<std::string> &report,
                                 std::vector<int> &student_id, int k) {
        // Membership sets make each report token O(1) to classify: +3 for
        // a positive word, -1 for a negative one, everything else free.
        // Sorting the (-points, id) pairs ascending is exactly the asked
        // ranking — highest points first, lower ID breaking ties — so the
        // first k identifiers are the answer.
        std::unordered_set<std::string> positives(positive_feedback.begin(), positive_feedback.end());
        std::unordered_set<std::string> negatives(negative_feedback.begin(), negative_feedback.end());
        std::vector<std::pair<int, int>> ranked;
        ranked.reserve(report.size());
        for (size_t i = 0; i < report.size(); i++) {
            int points = 0;
            size_t start = 0;
            while (start <= report[i].size()) {
                size_t end = report[i].find(' ', start);
                if (end == std::string::npos)
                    end = report[i].size();
                if (end > start) {
                    std::string word = report[i].substr(start, end - start);
                    if (positives.count(word))
                        points += 3;
                    else if (negatives.count(word))
                        points -= 1;
                }
                start = end + 1;
            }
            ranked.emplace_back(-points, student_id[i]);
        }
        std::sort(ranked.begin(), ranked.end());
        std::vector<int> answer(k);
        for (int i = 0; i < k; i++)
            answer[i] = ranked[i].second;
        return answer;
    }
};
