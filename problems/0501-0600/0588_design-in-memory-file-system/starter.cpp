class FileSystem {
  public:
    FileSystem();
    vector<string> ls(string path);
    void mkdir(string path);
    void addContentToFile(string filePath, string content);
    string readContentFromFile(string filePath);
};
