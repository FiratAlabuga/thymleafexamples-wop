import React from "react";
import { Input as MTInput } from "@material-tailwind/react";

// InputProps interface'i ile componentin props'larını tanımlıyoruz
interface InputProps {
    label?: string;
    error?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
}

// Input componenti
export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
    return (
        <div className="mb-6">
            {/* Label ekleniyor */}
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            {/* Material Tailwind Input componenti */}
            <MTInput
                onPointerEnterCapture={undefined} // Material Tailwind gereksinimi
                onPointerLeaveCapture={undefined} // Material Tailwind gereksinimi
                crossOrigin={undefined} // Material Tailwind gereksinimi
                color={error ? "red" : "blue"} // Hata durumunda kırmızı renk
                className="w-full"
                {...props} // Diğer props'ları burada yayıyoruz
            />

            {/* Hata mesajı gösteriliyor */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};