class Solution {
  public:
    bool areNumbersAscending(string s) {
        istringstream tokens(s);
        string token;
        int previous = 0;

        while (tokens >> token) {
            if (isdigit(static_cast<unsigned char>(token[0]))) {
                int current = stoi(token);
                if (current <= previous) {
                    return false;
                }
                previous = current;
            }
        }

        return true;
    }
};
