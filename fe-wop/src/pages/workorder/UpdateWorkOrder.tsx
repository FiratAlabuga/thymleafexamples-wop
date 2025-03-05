import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate import edildi
import { useTranslation } from '../../context/LanguageContext';
import { WorkOrderForm } from '../../components/WorkOrderForm';
import { WorkOrderDTO, RecordType, SituationType, ReasonCategory, SolutionCategory } from '../../types/WorkOrderDTO';
import { showToast } from '../../utils/toaster';
import {translations} from "../../constants/translations.ts";
import {workOrdersApi} from "../../api/workOrderApi.ts";

const UpdateWorkOrder = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate(); // useNavigate hook'u kullanıldı
    const [workOrder, setWorkOrder] = useState<WorkOrderDTO>({
        opyCode: '',
        maximoId: '',
        serviceRegistrationNumber: '',
        assigned: '',
        reported: '',
        application: '',
        description: '',
        completionDate: '',
        recordType: RecordType.MAINTENANCE, // enum değeri kullan
        situationType: SituationType.OPEN, // enum değeri kullan
        reasonCategory: ReasonCategory.EQUIPMENT_FAILURE, // enum değeri kullan
        solutionCategory: SolutionCategory.REPLACEMENT, // enum değeri kullan
    });
    const { language } = useTranslation();
    const t = translations[language];

    useEffect(() => {
        const fetchWorkOrder = async () => {
            try {
                const response = await workOrdersApi.getWorkOrderById(id);
                setWorkOrder(response.data);
            } catch (error) {
                showToast(t.error, 'error');
            }
        };
        fetchWorkOrder();
    }, [id, t.error]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setWorkOrder({ ...workOrder, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await workOrdersApi.updateWorkOrder(id, workOrder);
            showToast(t.workOrderUpdated, 'success');
            navigate('/work-orders'); // useNavigate ile yönlendirme yapıldı
        } catch (error) {
            showToast(t.error, 'error');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{t.updateWorkOrder}</h2>
            <WorkOrderForm
                workOrder={workOrder}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={() => navigate('/work-orders')} // useNavigate ile yönlendirme yapıldı
            />
        </div>
    );
};

export default UpdateWorkOrder;