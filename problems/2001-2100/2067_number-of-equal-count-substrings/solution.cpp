class Solution {
  public:
    int equalCountSubstrings(string s, int count) {
        int answer = 0;
        for (int distinct = 1; distinct <= 26; ++distinct) {
            int windowLength = distinct * count;
            if (windowLength > static_cast<int>(s.size()))
                break;
            array<int, 26> frequencies{};
            int present = 0;
            int exact = 0;

            for (int right = 0; right < static_cast<int>(s.size()); ++right) {
                int index = s[right] - 'a';
                if (frequencies[index] == 0)
                    ++present;
                if (frequencies[index] == count)
                    --exact;
                ++frequencies[index];
                if (frequencies[index] == count)
                    ++exact;

                if (right >= windowLength) {
                    index = s[right - windowLength] - 'a';
                    if (frequencies[index] == count)
                        --exact;
                    --frequencies[index];
                    if (frequencies[index] == count)
                        ++exact;
                    if (frequencies[index] == 0)
                        --present;
                }
                if (right + 1 >= windowLength && present == distinct && exact == distinct)
                    ++answer;
            }
        }
        return answer;
    }
};
