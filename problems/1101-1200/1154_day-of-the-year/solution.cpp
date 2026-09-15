class Solution {
  public:
    int dayOfYear(string date) {
        int year = stoi(date.substr(0, 4));
        int month = stoi(date.substr(5, 2));
        int day = stoi(date.substr(8, 2));
        int days[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        // Gregorian leap rule: div by 4, except centuries, except 400.
        bool leap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
        if (leap)
            days[1] = 29;
        int total = day;
        for (int m = 0; m < month - 1; ++m)
            total += days[m];
        return total;
    }
};
