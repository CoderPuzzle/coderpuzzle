class FileSystem {
  private:
    unordered_map<string, int> values;

  public:
    FileSystem() {}

    bool createPath(string path, int value) {
        if (values.count(path)) {
            return false;
        }
        string parent = path.substr(0, path.rfind('/'));
        if (!parent.empty() && !values.count(parent)) {
            return false;
        }
        values[path] = value;
        return true;
    }

    int get(string path) {
        auto found = values.find(path);
        return found == values.end() ? -1 : found->second;
    }
};
