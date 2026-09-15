class Solution {
  public:
    string reformatDate(string date) {
        // Split on spaces to get the day (with its ordinal suffix), the
        // three-letter month, and the four-digit year.
        int firstSpace = date.find(' ');
        int secondSpace = date.find(' ', firstSpace + 1);
        string dayPart = date.substr(0, firstSpace);
        string monthPart = date.substr(firstSpace + 1, secondSpace - firstSpace - 1);
        string year = date.substr(secondSpace + 1);

        static const unordered_map<string, string> months = {
            {"Jan", "01"}, {"Feb", "02"}, {"Mar", "03"}, {"Apr", "04"}, {"May", "05"}, {"Jun", "06"},
            {"Jul", "07"}, {"Aug", "08"}, {"Sep", "09"}, {"Oct", "10"}, {"Nov", "11"}, {"Dec", "12"}};

        // Every ordinal suffix (st/nd/rd/th) is exactly two letters, so
        // dropping the last two characters always leaves the bare digits.
        string day = dayPart.substr(0, dayPart.size() - 2);
        if (day.size() == 1)
            day = "0" + day;

        return year + "-" + months.at(monthPart) + "-" + day;
    }
};
