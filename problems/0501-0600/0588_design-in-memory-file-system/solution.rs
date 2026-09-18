use std::collections::BTreeMap;

// One directory or file: a file carries a text buffer and no children, a
// directory the reverse. BTreeMap keeps children in lexicographic order,
// so ls never sorts.
struct FileNode {
    children: BTreeMap<String, FileNode>,
    content: String,
    file: bool,
}

impl FileNode {
    fn directory() -> Self {
        FileNode {
            children: BTreeMap::new(),
            content: String::new(),
            file: false,
        }
    }
}

pub struct FileSystem {
    root: FileNode,
}

fn split_path(path: &str) -> Vec<&str> {
    path.split('/').filter(|part| !part.is_empty()).collect()
}

impl FileSystem {
    pub fn new() -> Self {
        FileSystem {
            root: FileNode::directory(),
        }
    }

    pub fn ls(&mut self, path: String) -> Vec<String> {
        let parts = split_path(&path);
        let mut node = &self.root;
        for part in &parts {
            node = node.children.get(*part).expect("ls path always exists");
        }
        // A file answers with its own name; a directory with its children.
        if node.file {
            return vec![parts[parts.len() - 1].to_string()];
        }
        node.children.keys().cloned().collect()
    }

    pub fn mkdir(&mut self, path: String) {
        let mut node = &mut self.root;
        for part in split_path(&path) {
            // Inserting each missing component also creates the middle dirs.
            node = node
                .children
                .entry(part.to_string())
                .or_insert_with(FileNode::directory);
        }
    }

    pub fn addContentToFile(&mut self, filePath: String, content: String) {
        let parts = split_path(&filePath);
        let mut node = &mut self.root;
        for part in &parts[..parts.len() - 1] {
            node = node.children.get_mut(*part).expect("file parent always exists");
        }
        // Append to the existing buffer, creating the file on first write.
        let file = node
            .children
            .entry(parts[parts.len() - 1].to_string())
            .or_insert_with(|| FileNode {
                children: BTreeMap::new(),
                content: String::new(),
                file: true,
            });
        file.file = true;
        file.content.push_str(&content);
    }

    pub fn readContentFromFile(&mut self, filePath: String) -> String {
        let parts = split_path(&filePath);
        let mut node = &self.root;
        for part in &parts[..parts.len() - 1] {
            node = node.children.get(*part).expect("file parent always exists");
        }
        node.children[parts[parts.len() - 1]].content.clone()
    }
}
