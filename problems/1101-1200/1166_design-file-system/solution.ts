class FileSystem {
    private readonly values = new Map<string, number>();

    constructor() {}

    createPath(path: string, value: number): boolean {
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

    get(path: string): number {
        return this.values.get(path) ?? -1;
    }
}
