class Trie {
  public:
    Trie();
    void insert(string word);
    int countWordsEqualTo(string word);
    int countWordsStartingWith(string prefix);
    void erase(string word);
};
