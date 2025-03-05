import React from 'react';
import { Input } from './Input';
import { Button } from './Button';
import {ReasonCategory, RecordType, SituationType, SolutionCategory, WorkOrderDTO} from '../types/WorkOrderDTO';
import { useTranslation } from '../context/LanguageContext';
import {translations} from "../constants/translations.ts";

interface WorkOrderFormProps {
    workOrder: WorkOrderDTO;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

export const WorkOrderForm: React.FC<WorkOrderFormProps> = ({ workOrder, onChange, onSubmit, onCancel }) => {
    const { language } = useTranslation();
    const t = translations[language];

    // Enum değerlerini çevirilerle eşleştiriyoruz
    const recordTypes = [
        { value: RecordType.MAINTENANCE, label: t.maintenance },
        { value: RecordType.INSPECTION, label: t.inspection },
        { value: RecordType.REPAIR, label: t.repair },
    ];

    const situationTypes = [
        { value: SituationType.OPEN, label: t.open },
        { value: SituationType.IN_PROGRESS, label: t.inProgress },
        { value: SituationType.CLOSED, label: t.closed },
    ];

    const reasonCategories = [
        { value: ReasonCategory.EQUIPMENT_FAILURE, label: t.equipmentFailure },
        { value: ReasonCategory.HUMAN_ERROR, label: t.humanError },
        { value: ReasonCategory.EXTERNAL_FACTOR, label: t.externalFactor },
    ];

    const solutionCategories = [
        { value: SolutionCategory.REPLACEMENT, label: t.replacement },
        { value: SolutionCategory.REPAIR, label: t.repair },
        { value: SolutionCategory.ADJUSTMENT, label: t.adjustment },
    ];

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <Input
                label={t.opyCode}
                name="opyCode"
                value={workOrder.opyCode}
                onChange={onChange}
            />
            <Input
                label={t.maximoId}
                name="maximoId"
                value={workOrder.maximoId}
                onChange={onChange}
            />
            <Input
                label={t.serviceRegistrationNumber}
                name="serviceRegistrationNumber"
                value={workOrder.serviceRegistrationNumber}
                onChange={onChange}
            />
            <Input
                label={t.assigned}
                name="assigned"
                value={workOrder.assigned}
                onChange={onChange}
            />
            <Input
                label={t.reported}
                name="reported"
                value={workOrder.reported}
                onChange={onChange}
            />
            <Input
                label={t.application}
                name="application"
                value={workOrder.application}
                onChange={onChange}
            />
            <Input
                label={t.description}
                name="description"
                value={workOrder.description}
                onChange={onChange}
            />
            <Input
                label={t.completionDate}
                name="completionDate"
                type="datetime-local"
                value={workOrder.completionDate}
                onChange={onChange}
            />
            <div>
                <label className="block text-sm font-medium text-gray-700">{t.recordType}</label>
                <select
                    name="recordType"
                    value={workOrder.recordType}
                    onChange={onChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                    {recordTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">{t.situationType}</label>
                <select
                    name="situationType"
                    value={workOrder.situationType}
                    onChange={onChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                    {situationTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">{t.reasonCategory}</label>
                <select
                    name="reasonCategory"
                    value={workOrder.reasonCategory}
                    onChange={onChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                    {reasonCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">{t.solutionCategory}</label>
                <select
                    name="solutionCategory"
                    value={workOrder.solutionCategory}
                    onChange={onChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                    {solutionCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex space-x-4">
                <Button type="submit" variant="primary">{t.save}</Button>
                <Button type="button" variant="secondary" onClick={onCancel}>{t.cancel}</Button>
            </div>
        </form>
    );
};