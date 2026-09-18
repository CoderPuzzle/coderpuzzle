class FileSystem {
    constructor() {
        // The whole file system is one tree: each node is a directory
        // (children map) or a file (content buffer) — files and subdirs
        // share one namespace. The children map is plain; ls sorts names
        // on the way out.
        this.root = { children: new Map(), file: false, content: "" };
    }

    ls(path) {
        const parts = this.split(path);
        let node = this.root;
        for (const part of parts) {
            node = node.children.get(part);
        }
        // A file answers with its own name; a directory with its children.
        if (node.file) {
            return [parts[parts.length - 1]];
        }
        return [...node.children.keys()].sort();
    }

    mkdir(path) {
        let node = this.root;
        for (const part of this.split(path)) {
            // Creating each missing component also creates the middle dirs.
            let next = node.children.get(part);
            if (!next) {
                next = { children: new Map(), file: false, content: "" };
                node.children.set(part, next);
            }
            node = next;
        }
    }

    addContentToFile(filePath, content) {
        const parts = this.split(filePath);
        let node = this.root;
        for (const part of parts.slice(0, -1)) {
            node = node.children.get(part);
        }
        const name = parts[parts.length - 1];
        // Append to the existing buffer, creating the file on first write.
        let file = node.children.get(name);
        if (!file) {
            file = { children: null, file: true, content: "" };
            node.children.set(name, file);
        }
        file.file = true;
        file.content += content;
    }

    readContentFromFile(filePath) {
        const parts = this.split(filePath);
        let node = this.root;
        for (const part of parts.slice(0, -1)) {
            node = node.children.get(part);
        }
        return node.children.get(parts[parts.length - 1]).content;
    }

    split(path) {
        return path.split("/").filter((part) => part !== "");
    }
}
