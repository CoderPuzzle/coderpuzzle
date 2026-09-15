#include <string>
#include <vector>

class Solution {
  public:
    std::string largestMultipleOfThree(std::vector<int> &digits) {
        int counts[10] = {0};
        int total = 0;
        for (int d : digits) {
            counts[d] += 1;
            total += d;
        }

        int remainder = total % 3;
        if (remainder == 1) {
            if (!drop(counts, 1, 1))
                drop(counts, 2, 2);
        } else if (remainder == 2) {
            if (!drop(counts, 1, 2))
                drop(counts, 2, 1);
        }

        std::string text;
        for (int d = 9; d >= 0; d--)
            text.append(counts[d], static_cast<char>('0' + d));
        bool any = false;
        for (int c : counts)
            any |= c != 0;
        if (text.empty() || text[0] == '0')
            return any ? "0" : "";
        return text;
    }

  private:
    bool drop(int *counts, int dropCount, int cls) {
        for (int d = cls; d <= 9; d += 3) {
            int take = counts[d] < dropCount ? counts[d] : dropCount;
            counts[d] -= take;
            dropCount -= take;
            if (dropCount == 0)
                return true;
        }
        return false;
    }
};
