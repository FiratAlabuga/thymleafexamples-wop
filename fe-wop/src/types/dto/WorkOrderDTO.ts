export interface WorkOrderDTO {
    id?: string;
    opyCode: string;
    maximoId: string;
    serviceRegistrationNumber: string;
    assigned: string;
    reported: string;
    application: string;
    description: string;
    completionDate: string;
    recordType: RecordType;
    situationType: SituationType;
    reasonCategory: ReasonCategory;
    solutionCategory: SolutionCategory;
}

export enum RecordType {
    MAINTENANCE = "MAINTENANCE",
    INSPECTION = "INSPECTION",
    REPAIR = "REPAIR",
}

export enum ReasonCategory {
    EQUIPMENT_FAILURE = "EQUIPMENT_FAILURE",
    HUMAN_ERROR = "HUMAN_ERROR",
    EXTERNAL_FACTOR = "EXTERNAL_FACTOR",
}

export enum SituationType {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    CLOSED = "CLOSED",
}

export enum SolutionCategory {
    REPLACEMENT = "REPLACEMENT",
    REPAIR = "REPAIR",
    ADJUSTMENT = "ADJUSTMENT",
}