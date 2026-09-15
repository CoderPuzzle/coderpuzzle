class FileSystem {
    constructor() {
        this.values = new Map();
    }

    createPath(path, value) {
        if (this.values.has(path)) {
            return false;
        }
        const parent = path.slice(0, path.lastIndexOf("/"));
        if (parent && !this.values.has(parent)) {
            return false;
        }
        this.values.set(path, value);
        return true;
    }

    get(path) {
        return this.values.get(path) ?? -1;
    }
}
