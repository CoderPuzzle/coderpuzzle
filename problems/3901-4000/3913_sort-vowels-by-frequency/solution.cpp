class Solution {
  public:
    string sortVowels(string s) {
        const string vowels = "aeiou";
        array<int, 5> counts{};
        array<int, 5> first;
        first.fill(s.size());
        for (int position = 0; position < (int)s.size(); ++position) {
            size_t slot = vowels.find(s[position]);
            if (slot != string::npos) {
                ++counts[slot];
                first[slot] = min(first[slot], position);
            }
        }

        array<int, 5> order{0, 1, 2, 3, 4};
        sort(order.begin(), order.end(),
             [&](int a, int b) { return counts[a] != counts[b] ? counts[a] > counts[b] : first[a] < first[b]; });
        string arranged;
        for (int slot : order)
            arranged.append(counts[slot], vowels[slot]);

        int pointer = 0;
        for (char &ch : s) {
            if (vowels.find(ch) != string::npos)
                ch = arranged[pointer++];
        }
        return s;
    }
};
