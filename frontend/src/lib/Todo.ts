
export default class Todo {
    private todo_id: string;
    private title: string;
    private description: string;
    private resolve: boolean;

    constructor(todo_id: string, title: string, description: string, resolve: boolean) {
        this.todo_id = todo_id;
        this.title = title;
        this.description = description;
        this.resolve = resolve;
    }

    public getTodoId (): string {
        return this.todo_id;
    }

    public getTitle (): string {
        return this.title;
    }

    public getResolve (): boolean {
        return this.resolve;
    }

    public setResolve (resolve: boolean): void {
        this.resolve = resolve;
    }

    public getDescription (): string {
        return this.description;
    }

    public getFullDetails (): string {
        return `Title: ${this.title} | description: ${this.description}`;
    }

}