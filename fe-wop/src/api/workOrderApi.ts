import axiosInstance from '../utils/axiosInstance';
import { WorkOrderDTO } from '../types/WorkOrderDTO';

export const workOrdersApi = {
    getAllWorkOrders: (page: number, size: number) =>
        axiosInstance.get(`/api/v1/workorders?page=${page}&size=${size}`),
    getWorkOrderById: (id: string | undefined) => axiosInstance.get(`/api/v1/workorders/${id}`),
    createWorkOrder: (workOrder: WorkOrderDTO) => axiosInstance.post('/api/v1/workorders', workOrder),
    updateWorkOrder: (id: string | undefined, workOrder: WorkOrderDTO) =>
        axiosInstance.put(`/api/v1/workorders/${id}`, workOrder),
    deleteWorkOrder: (id: number | undefined) => axiosInstance.delete(`/api/v1/workorders/${id}`),
};