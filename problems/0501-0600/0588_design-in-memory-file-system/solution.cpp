#include <map>
#include <string>
#include <vector>

namespace {

// One directory or file: a file carries a text buffer and no children, a
// directory the reverse. std::map keeps children in lexicographic order,
// so ls never sorts.
struct FileNode {
    std::map<std::string, FileNode> children;
    std::string content;
    bool file = false;
};

std::vector<std::string> splitPath(const std::string &path) {
    std::vector<std::string> parts;
    std::string current;
    for (char c : path) {
        if (c == '/') {
            if (!current.empty()) {
                parts.push_back(current);
                current.clear();
            }
        } else {
            current += c;
        }
    }
    if (!current.empty()) {
        parts.push_back(current);
    }
    return parts;
}

} // namespace

class FileSystem {
  public:
    FileSystem() = default;

    std::vector<std::string> ls(std::string path) {
        std::vector<std::string> parts = splitPath(path);
        FileNode *node = &root;
        for (const std::string &part : parts) {
            node = &node->children[part];
        }
        // A file answers with its own name; a directory with its children.
        if (node->file) {
            return {parts.back()};
        }
        std::vector<std::string> names;
        for (const auto &entry : node->children) {
            names.push_back(entry.first);
        }
        return names;
    }

    void mkdir(std::string path) {
        FileNode *node = &root;
        for (const std::string &part : splitPath(path)) {
            // Inserting each missing component also creates the middle dirs.
            node = &node->children[part];
        }
    }

    void addContentToFile(std::string filePath, std::string content) {
        std::vector<std::string> parts = splitPath(filePath);
        FileNode *node = &root;
        for (size_t index = 0; index + 1 < parts.size(); index++) {
            node = &node->children[parts[index]];
        }
        // Append to the existing buffer, creating the file on first write.
        FileNode &file = node->children[parts.back()];
        file.file = true;
        file.content += content;
    }

    std::string readContentFromFile(std::string filePath) {
        std::vector<std::string> parts = splitPath(filePath);
        FileNode *node = &root;
        for (size_t index = 0; index + 1 < parts.size(); index++) {
            node = &node->children[parts[index]];
        }
        return node->children[parts.back()].content;
    }

  private:
    FileNode root;
};
