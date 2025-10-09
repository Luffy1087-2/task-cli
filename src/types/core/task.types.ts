export type TasksJson = {
    Name: string,
    Description: string,
    Status: 0 | 1 | 2
    CreatedAt: number,
    UpdatedAt: number
}[];