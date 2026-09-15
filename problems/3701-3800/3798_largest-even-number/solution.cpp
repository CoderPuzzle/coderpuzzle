class Solution {
  public:
    string largestEven(string s) {
        // An even result must end in '2', and a longer number of these
        // digits always beats a shorter one, so the best keeps every
        // character up through the last '2' and sheds the odd tail.
        size_t i = s.rfind('2');
        if (i == string::npos) {
            return "";
        }
        return s.substr(0, i + 1);
    }
};
