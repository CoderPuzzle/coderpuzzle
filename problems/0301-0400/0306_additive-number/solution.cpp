class Solution {
  public:
    bool isAdditiveNumber(string num) {
        // The first two numbers fix the whole sequence, so try each split of
        // them and let string addition verify the remainder. No machine
        // integers anywhere: rejected candidates can outgrow 64 bits.
        const int n = num.size();
        for (int i = 1; i < n; ++i) {
            if (!valid(num, 0, i))
                continue;
            // j < n leaves at least one digit for the third number.
            for (int j = i + 1; j < n; ++j) {
                if (!valid(num, i, j))
                    continue;
                if (consumes(num, num.substr(0, i), num.substr(i, j - i), j))
                    return true;
            }
        }
        return false;
    }

  private:
    bool valid(const string &num, int start, int end) {
        // Multi-digit numbers may not open with '0'; a lone 0 is legal.
        return end - start == 1 || num[start] != '0';
    }

    bool consumes(const string &num, string first, string second, int start) {
        // Greedy walk: the next number's digits are exactly the sum's
        // digits, so its length is never a choice.
        while (start < (int)num.size()) {
            string total = add(first, second);
            if (num.compare(start, total.size(), total) != 0)
                return false;
            start += (int)total.size();
            first = move(second);
            second = move(total);
        }
        return true;
    }

    string add(const string &a, const string &b) {
        // Schoolbook addition on digit characters, least significant
        // first, carrying as we go.
        string digits;
        int carry = 0;
        int i = a.size() - 1, j = b.size() - 1;
        while (i >= 0 || j >= 0 || carry) {
            int total = carry;
            if (i >= 0)
                total += a[i--] - '0';
            if (j >= 0)
                total += b[j--] - '0';
            digits.push_back('0' + total % 10);
            carry = total / 10;
        }
        reverse(digits.begin(), digits.end());
        return digits;
    }
};
