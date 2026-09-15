class Solution {
  public:
    int scoreOfStudents(string s, vector<int> &answers) {
        long long correct = correctValue(s);
        int size = (s.size() + 1) / 2;
        vector<int> numbers(size);
        vector<char> operators(size - 1);
        for (int index = 0; index < size; ++index) {
            numbers[index] = s[index * 2] - '0';
            if (index + 1 < size)
                operators[index] = s[index * 2 + 1];
        }

        vector<vector<unordered_set<int>>> dp(size, vector<unordered_set<int>>(size));
        for (int index = 0; index < size; ++index)
            dp[index][index].insert(numbers[index]);
        for (int length = 2; length <= size; ++length) {
            for (int left = 0; left + length <= size; ++left) {
                int right = left + length - 1;
                for (int split = left; split < right; ++split) {
                    for (int first : dp[left][split]) {
                        for (int second : dp[split + 1][right]) {
                            long long value =
                                operators[split] == '+' ? (long long)first + second : (long long)first * second;
                            if (value <= 1000)
                                dp[left][right].insert((int)value);
                        }
                    }
                }
            }
        }

        int score = 0;
        for (int answer : answers) {
            if (answer == correct)
                score += 5;
            else if (dp[0][size - 1].count(answer))
                score += 2;
        }
        return score;
    }

  private:
    long long correctValue(const string &expression) {
        long long total = 0;
        long long product = expression[0] - '0';
        for (int index = 1; index < (int)expression.size(); index += 2) {
            int value = expression[index + 1] - '0';
            if (expression[index] == '*')
                product *= value;
            else {
                total += product;
                product = value;
            }
        }
        return total + product;
    }
};
