# Design In-Memory File System

## Description

Design a data structure that simulates an in-memory file system.

Implement the `FileSystem` class:

- `FileSystem()` Initializes the object of the system.
- `List<String> ls(String path)` If `path` is a file path, returns a list that
  only contains this file's name. If `path` is a directory path, returns the
  list of file and directory names in this directory. The answer should be in
  lexicographic order.
- `void mkdir(String path)` Makes a new directory according to the given path.
  The given directory path does not exist. If the middle directories in the
  path do not exist, you should create them as well.
- `void addContentToFile(String filePath, String content)` If `filePath` does
  not exist, creates that file containing the given content. If `filePath`
  already exists, appends the given content to the original content.
- `String readContentFromFile(String filePath)` Returns the content in the
  file at `filePath`.

### Example 1

```text
Input:
["FileSystem", "ls", "mkdir", "addContentToFile", "ls", "readContentFromFile"]
[[], ["/"], ["/a/b/c"], ["/a/b/c/d", "hello"], ["/"], ["/a/b/c/d"]]
Output: [null, [], null, null, ["a"], "hello"]
Explanation:
FileSystem fileSystem = new FileSystem();
fileSystem.ls("/");                         // return []
fileSystem.mkdir("/a/b/c");
fileSystem.addContentToFile("/a/b/c/d", "hello");
fileSystem.ls("/");                         // return ["a"]
fileSystem.readContentFromFile("/a/b/c/d"); // return "hello"
```

### Example 2

```text
Input:
["FileSystem", "mkdir", "addContentToFile", "ls", "ls", "ls", "addContentToFile", "readContentFromFile"]
[[], ["/a"], ["/a/f", "x"], ["/a"], ["/a/f"], ["/"], ["/a/f", "y"], ["/a/f"]]
Output: [null, null, null, ["f"], ["f"], ["a"], null, "xy"]
Explanation:
FileSystem fileSystem = new FileSystem();
fileSystem.mkdir("/a");
fileSystem.addContentToFile("/a/f", "x");
fileSystem.ls("/a");                        // return ["f"], one file in the directory /a
fileSystem.ls("/a/f");                      // return ["f"], the path names a file
fileSystem.ls("/");                         // return ["a"]
fileSystem.addContentToFile("/a/f", "y");   // appends, the file now holds "xy"
fileSystem.readContentFromFile("/a/f");     // return "xy"
```

### Constraints

- `1 <= path.length, filePath.length <= 100`
- `path` and `filePath` are absolute paths which begin with `/` and do not end
  with `/` except that the path is just `/`.
- All directory names and file names only contain lowercase letters, and the
  same name will not exist twice in the same directory.
- All operations are passed valid parameters: no one attempts to retrieve file
  content, list a directory or file, or create a directory that does not
  exist, and the parent directory for the file in `addContentToFile` exists.
- `1 <= content.length <= 50`
- At most `300` calls will be made to `ls`, `mkdir`, `addContentToFile`, and
  `readContentFromFile`.

### Follow-up

Could you make every operation run in time linear in the number of path
components, without rescanning or re-sorting the whole hierarchy?

## Hints

### Hint 1

A file system is a tree: the root `/` is a node, every directory is a node,
and every file is a leaf. Each directory node needs a mapping from child name
to child node — and nothing else needs to be stored globally.

### Hint 2

Resolve a path by splitting on `/` (dropping empty pieces, so `/a/b/c` becomes
`a`, `b`, `c`) and descending one mapping lookup per component. `mkdir` uses
the same walk, creating missing children as it goes.

### Hint 3

Give each node a marker that distinguishes a file from a directory (for
example, its content). `ls` then has two cases: a file returns its own name,
a directory returns its children's names — kept in sorted order by using a
sorted map for children (or by sorting on the way out).
