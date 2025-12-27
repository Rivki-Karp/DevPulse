export interface Status {
    id: number;
    name: string;
}

export interface Priority {
    id: number;
    name: string;
}
export const statusOptions = ["Open", "In Progress", "Done"];
export const priorityOptions = ["Low", "Medium", "High"];
