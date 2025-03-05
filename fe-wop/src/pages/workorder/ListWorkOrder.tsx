import { useState, useEffect } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { WorkOrderDTO } from '../../types/WorkOrderDTO';
import { Button } from '../../components/Button';
import { showToast } from '../../utils/toaster';
import {translations} from "../../constants/translations.ts";
import {workOrdersApi} from "../../api/workOrderApi.ts";
import { Card, Typography } from "@material-tailwind/react";


const ListWorkOrder = () => {
    const [workOrders, setWorkOrders] = useState<WorkOrderDTO[]>([]);
    const { language } = useTranslation();
    const t = translations[language];

    useEffect(() => {
        const fetchWorkOrders = async () => {
            try {
                const response = await workOrdersApi.getAllWorkOrders(0, 10);
                setWorkOrders(response.data.content);
            } catch (error) {
                showToast(t.error, 'error');
            }
        };
        fetchWorkOrders();
    }, [t.error]);

    const handleDelete = async (id: number | undefined) => {
        try {
            await workOrdersApi.deleteWorkOrder(id);
            setWorkOrders(workOrders.filter(order => order.id !== id));
            showToast(t.workOrderDeleted, 'success');
        } catch (error) {
            showToast(t.error, 'error');
        }
    };

    // return (
    //     <div className="p-4">
    //         <h2 className="text-2xl font-bold mb-4">{t.listWorkOrders}</h2>
    //         <div className="space-y-4">
    //             {workOrders.map((order) => (
    //                 <div key={order.id} className="p-4 border rounded">
    //                     <h3 className="text-xl font-semibold">{order.description}</h3>
    //                     <p>{order.assigned}</p>
    //                     <div className="flex space-x-2 mt-2">
    //                         <Button variant="primary" onClick={() => window.location.href = `/work-orders/${order.id}`}>Edit</Button>
    //                         <Button variant="danger" onClick={() => handleDelete(order.id)}>Delete</Button>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );

    return (
        <Card className="h-full w-full overflow-scroll" placeholder={undefined}
              onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                <tr>
                    {/* Tablo başlıklarını dinamik olarak oluştur */}
                    {workOrders.length > 0 && Object.keys(workOrders[0]).map((key) => (
                        <th key={key} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                                placeholder={undefined} onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}                            >
                                {key}
                            </Typography>
                        </th>
                    ))}
                    {/* Actions başlığı */}
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70" placeholder={undefined}
                            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                            Actions
                        </Typography>
                    </th>
                </tr>
                </thead>
                <tbody>
                {workOrders.map((order) => {
                    const isLast = workOrders.indexOf(order) === workOrders.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                    return (
                        <tr key={order.id}>
                            {/* Her bir order'ın value'larını dinamik olarak göster */}
                            {Object.values(order).map((value, idx) => (
                                <td key={idx} className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal"
                                                placeholder={undefined}
                                                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        {value !== null && typeof value === 'object' ? JSON.stringify(value) : value}
                                    </Typography>
                                </td>
                            ))}
                            {/* Edit ve Delete butonları */}
                            <td className={`${classes} bg-blue-gray-50/50`}>
                                <Button
                                    variant="primary"
                                    onClick={() => window.location.href = `/work-orders/${order.id}`}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(order.id)}
                                    className="ml-2"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </Card>
    );

};

export default ListWorkOrder;