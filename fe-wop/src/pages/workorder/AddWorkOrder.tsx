import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { WorkOrderForm } from '../../components/WorkOrderForm';
import {ReasonCategory, RecordType, SituationType, SolutionCategory, WorkOrderDTO} from '../../types/WorkOrderDTO';
import { showToast } from '../../utils/toaster';
import {translations} from "../../constants/translations.ts";
import {workOrdersApi} from "../../api/workOrderApi.ts";

const AddWorkOrder = () => {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Eğer completionDate ise, tarih ve saat bilgisini al
        if (name === 'completionDate') {
            const date = new Date(value); // Kullanıcının girdiği tarih ve saat
            const isDateOnly = value.indexOf('T') === -1; // Eğer sadece tarih (T yoksa)

            // Eğer sadece tarih girildiyse, saat bilgisini varsayılan olarak '00:00:00' yap
            const formattedDate = isDateOnly ? `${date.toISOString().split('T')[0]}T00:00:00` : date.toISOString();
            setWorkOrder({ ...workOrder, [name]: formattedDate });
        } else {
            setWorkOrder({ ...workOrder, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await workOrdersApi.createWorkOrder(workOrder);
            showToast(t.workOrderAdded, 'success');
            // Formu temizle
            setWorkOrder({
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
        } catch (error) {
            showToast(t.error, 'error');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{t.addWorkOrder}</h2>
            <WorkOrderForm
                workOrder={workOrder}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={() => setWorkOrder({
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
                })}
            />
        </div>
    );
};

export default AddWorkOrder;