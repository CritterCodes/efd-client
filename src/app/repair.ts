export interface Repair {
    repairID: string;
    userID: string;
    description: string;
    picture: string;
    receivedDate: string;
    promiseDate: string;
    metalType: string;
    repairTasks: string[];
    status: string;
}

export interface RepairTask {
    taskID: string,
    sku: string,
    title: string,
    metalType: string,
    variantId: string,
    productId: string,
    repairTaskID: string
}