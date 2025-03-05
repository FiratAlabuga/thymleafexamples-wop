import React, {ReactNode} from 'react';
import {Input, InputProps} from '@material-tailwind/react';

interface CustomInputProps extends InputProps {
    label: string;
    icon?: ReactNode;
    error?: boolean;
    success?: boolean;
    helperText?: string;
    disabled?: boolean;
    fullWidth?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
                                                     label,
                                                     icon,
                                                     error = false,
                                                     success = false,
                                                     helperText,
                                                     disabled = false,
                                                     fullWidth = false,
                                                     ...props
                                                 }) => {
    return (
        <div className={`flex flex-col ${fullWidth ? 'w-full' : 'w-72'} mb-4`}>
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="relative">
                {/* Input kısmı */}
                <Input
                    onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                    crossOrigin={undefined} {...props}
                    label={label}
                    error={error}
                    success={success}
                    disabled={disabled}
                    className={`w-full pl-10 p-3 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} ${success ? 'border-green-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-300 text-black bg-white`} // Paddingi sol taraftan ayarlıyoruz
                />
                {/* İkonun konumlandırılması */}
                {icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                        {icon}
                    </div>
                )}
                {/* Hata mesajı */}
                {helperText && error && (
                    <small className="text-xs text-red-500 mt-1">{helperText}</small>
                )}
            </div>
        </div>
    );
};

export default CustomInput;
