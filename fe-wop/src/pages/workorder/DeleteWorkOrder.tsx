import { useParams, useNavigate } from 'react-router-dom'; // useNavigate import edildi
import { useTranslation } from '../../context/LanguageContext';
import { showToast } from '../../utils/toaster';
import {translations} from "../../constants/translations.ts";
import {workOrdersApi} from "../../api/workOrderApi.ts";
import {useEffect} from "react";

const DeleteWorkOrder = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate(); // useNavigate hook'u kullanıldı
    const { language } = useTranslation();
    const t = translations[language];

    useEffect(() => {
        const deleteWorkOrder = async () => {
            try {
                await workOrdersApi.deleteWorkOrder(id);
                showToast(t.workOrderDeleted, 'success');
                navigate('/work-orders');
            } catch (error) {
                showToast(t.error, 'error');
            }
        };
        deleteWorkOrder();
    }, [id, history, t.error, t.workOrderDeleted]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{t.deleteWorkOrder}</h2>
            <p>{t.workOrderDeleted}</p>
        </div>
    );
};

export default DeleteWorkOrder;