class Solution {
  public:
    vector<int> maxActiveSectionsAfterTrade(string s, vector<vector<int>> &queries) {
        int length = static_cast<int>(s.size());
        int ones = length - static_cast<int>(count(s.begin(), s.end(), '0'));
        // Maximal runs of '0's, as parallel start/length arrays; the optimal
        // trade zeroes the '1' run between two zero runs and flips the merge.
        vector<int> starts;
        vector<int> lens;
        vector<int> ends;
        int index = 0;
        while (index < length) {
            if (s[index] == '0') {
                int runStart = index;
                while (index < length && s[index] == '0')
                    index++;
                starts.push_back(runStart);
                lens.push_back(index - runStart);
                ends.push_back(index - 1);
            } else {
                index++;
            }
        }
        int groups = static_cast<int>(starts.size());

        // Sparse table for range maximum over adjacent sums lens[k]+lens[k+1].
        int size = groups - 1;
        int levels = 0;
        while ((1 << levels) <= size)
            levels++;
        vector<vector<int>> table(levels);
        vector<int> logs(size + 1, 0);
        if (size >= 1) {
            table[0].resize(size);
            for (int k = 0; k < size; ++k)
                table[0][k] = lens[k] + lens[k + 1];
            for (int level = 1; level < levels; ++level) {
                int step = 1 << (level - 1);
                table[level].resize(size - (1 << level) + 1);
                for (int q = 0; q < static_cast<int>(table[level].size()); ++q)
                    table[level][q] = max(table[level - 1][q], table[level - 1][q + step]);
            }
            for (int q = 2; q <= size; ++q)
                logs[q] = logs[q / 2] + 1;
        }

        vector<int> answer;
        answer.reserve(queries.size());
        for (const auto &query : queries) {
            int left = query[0];
            int right = query[1];
            int gain = 0;
            if (groups >= 2) {
                // Zero runs clipped by the window edges only shrink the two
                // boundary pairs; every fully interior pair is exact.
                int first = lower_bound(ends.begin(), ends.end(), left) - ends.begin();
                int last = upper_bound(starts.begin(), starts.end(), right) - starts.begin() - 2;
                if (first <= last) {
                    int clipLeft = min(lens[first], ends[first] - left + 1);
                    int clipRight = min(lens[last + 1], right - starts[last + 1] + 1);
                    int pairFirst;
                    int pairLast;
                    if (first == last) {
                        pairFirst = clipLeft + clipRight;
                        pairLast = pairFirst;
                    } else {
                        pairFirst = clipLeft + lens[first + 1];
                        pairLast = lens[last] + clipRight;
                    }
                    int innerLo = first + (s[left] == '0' ? 1 : 0);
                    int innerHi = last - (s[right] == '0' ? 1 : 0);
                    int inner = 0;
                    if (innerLo <= innerHi) {
                        int level = logs[innerHi - innerLo + 1];
                        inner = max(table[level][innerLo], table[level][innerHi - (1 << level) + 1]);
                    }
                    gain = max({pairFirst, pairLast, inner});
                }
            }
            answer.push_back(ones + gain);
        }
        return answer;
    }
};
