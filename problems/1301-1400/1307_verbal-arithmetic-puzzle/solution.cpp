class Solution {
  public:
    bool isSolvable(vector<string> &words, string result) {
        // Column-wise backtracking, mirroring hand addition: dfs(pos, row)
        // walks column pos of row `row`, accumulating a carry. Once every row
        // of the column is folded in, the sum's low digit must equal the
        // result letter's digit and the rest flows on as the new carry.
        array<bool, 26> seen{};
        array<bool, 26> leads{};
        for (const string &word : words) {
            for (char ch : word)
                seen[ch - 'A'] = true;
            leads[word[0] - 'A'] = true;
        }
        for (char ch : result)
            seen[ch - 'A'] = true;
        leads[result[0] - 'A'] = true;
        int distinct = 0;
        for (bool s : seen)
            distinct += s ? 1 : 0;
        if (distinct > 10)
            return false;

        words_.clear();
        for (const string &word : words) {
            string row(rbegin(word), rend(word));
            words_.push_back(row);
        }
        target_ = string(rbegin(result), rend(result));
        leads_ = leads;
        value_.fill(-1);
        used_.fill(false);
        int widest = 0;
        for (const string &row : words_)
            widest = max(widest, (int)row.size());
        // No leading zeros, so the sum is at least 10^(widest-1): the result
        // needs at least `widest` digits and at most widest + 1.
        if ((int)target_.size() < widest || (int)target_.size() > widest + 1)
            return false;
        return dfs(0, 0, 0);
    }

  private:
    vector<string> words_;
    string target_;
    array<int, 26> value_;
    array<bool, 10> used_;
    array<bool, 26> leads_;

    bool dfs(int pos, int row, int carry) {
        if (pos == (int)target_.size())
            return carry == 0;
        if (row == (int)words_.size()) {
            // All rows folded: bind the result letter of this column.
            int digit = carry % 10;
            char ch = target_[pos];
            if (value_[ch - 'A'] != -1) {
                return value_[ch - 'A'] == digit && dfs(pos + 1, 0, carry / 10);
            }
            if (used_[digit] || (digit == 0 && leads_[ch - 'A']))
                return false;
            value_[ch - 'A'] = digit;
            used_[digit] = true;
            bool ok = dfs(pos + 1, 0, carry / 10);
            if (!ok) {
                used_[digit] = false;
                value_[ch - 'A'] = -1;
            }
            return ok;
        }
        char ch = pos < (int)words_[row].size() ? words_[row][pos] : 0;
        if (ch == 0)
            return dfs(pos, row + 1, carry);
        if (value_[ch - 'A'] != -1)
            return dfs(pos, row + 1, carry + value_[ch - 'A']);
        for (int digit = 0; digit < 10; ++digit) {
            if (used_[digit] || (digit == 0 && leads_[ch - 'A']))
                continue;
            value_[ch - 'A'] = digit;
            used_[digit] = true;
            if (dfs(pos, row + 1, carry + digit))
                return true;
            used_[digit] = false;
            value_[ch - 'A'] = -1;
        }
        return false;
    }
};
