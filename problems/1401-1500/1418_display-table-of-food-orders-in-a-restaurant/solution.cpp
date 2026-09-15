#include <algorithm>
#include <map>
#include <set>
#include <string>
#include <vector>

class Solution {
  public:
    std::vector<std::vector<std::string>> displayTable(std::vector<std::vector<std::string>> &orders) {
        std::map<std::pair<long long, std::string>, int> counts;
        std::map<long long, std::string> tablesByNumber;
        std::set<std::string> foods;
        for (const auto &order : orders) {
            const std::string &table = order[1];
            const std::string &food = order[2];
            foods.insert(food);
            long long number = std::stoll(table);
            tablesByNumber[number] = table;
            counts[{number, food}] += 1;
        }
        std::vector<std::string> sortedFoods(foods.begin(), foods.end());
        std::vector<std::vector<std::string>> grid;
        std::vector<std::string> header;
        header.push_back("Table");
        header.insert(header.end(), sortedFoods.begin(), sortedFoods.end());
        grid.push_back(header);
        for (const auto &entry : tablesByNumber) {
            std::vector<std::string> row;
            row.push_back(entry.second);
            for (const std::string &food : sortedFoods) {
                auto it = counts.find({entry.first, food});
                row.push_back(std::to_string(it == counts.end() ? 0 : it->second));
            }
            grid.push_back(row);
        }
        return grid;
    }
};
