class SQL {
  public:
    // One table record per name in a hash map: the declared column count,
    // an id -> row map, and a never-reset auto-increment counter. Failed
    // inserts never touch the counter, and removals never roll it back,
    // so the ids issued in a table strictly ascend and are never reused —
    // the ordered row map therefore gives exp() its output order.
    SQL(vector<string> names, vector<int> columns) {
        for (size_t i = 0; i < names.size(); ++i)
            tables_[names[i]] = Table{columns[i], {}, 1};
    }

    bool ins(string name, vector<string> row) {
        auto found = tables_.find(name);
        if (found == tables_.end() || (int)row.size() != found->second.columns)
            return false;
        Table &table = found->second;
        table.rows[table.next_id] = row;
        ++table.next_id;
        return true;
    }

    void rmv(string name, int rowId) {
        auto found = tables_.find(name);
        if (found != tables_.end())
            found->second.rows.erase(rowId);
    }

    string sel(string name, int rowId, int columnId) {
        auto found = tables_.find(name);
        if (found == tables_.end())
            return "<null>";
        const Table &table = found->second;
        auto row = table.rows.find(rowId);
        if (row == table.rows.end() || columnId < 1 || columnId > table.columns)
            return "<null>";
        return row->second[columnId - 1];
    }

    vector<string> exp(string name) {
        auto found = tables_.find(name);
        if (found == tables_.end())
            return {};
        vector<string> lines;
        for (const auto &entry : found->second.rows) {
            string line = to_string(entry.first);
            for (const string &cell : entry.second)
                line += "," + cell;
            lines.push_back(line);
        }
        return lines;
    }

  private:
    struct Table {
        int columns;
        // An ordered map keeps the row ids ascending for exp() walks.
        map<int, vector<string>> rows;
        int next_id = 1;
    };
    unordered_map<string, Table> tables_;
};
