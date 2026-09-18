class FileSystem {
    constructor() {}

    ls(path: string): string[] {}

    mkdir(path: string) {}

    addContentToFile(filePath: string, content: string) {}

    readContentFromFile(filePath: string): string {}
}
