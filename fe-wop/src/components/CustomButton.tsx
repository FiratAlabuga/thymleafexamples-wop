import React, {ReactNode} from 'react';
import {Button, ButtonProps} from '@material-tailwind/react';

// Butonun alabileceği prop'ların tiplerini tanımlıyoruz
interface CustomButtonProps extends ButtonProps {
    variant?: 'filled' | 'outlined' | 'gradient'; // Butonun stil seçenekleri
    size?: 'sm' | 'md' | 'lg' ; // Butonun boyut seçenekleri
    color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'pink' | 'indigo' | 'teal'; // Butonun renk seçenekleri
    loading?: boolean; // Butonun yükleniyor durumu
    icon?: ReactNode; // Butonun içine eklenebilecek simge (ReactNode türünde olabilir)
    fullWidth?: boolean; // Butonun tam genişlikte olup olmayacağı
    disabled?: boolean; // Butonun pasif olup olmayacağı
    ripple?: boolean; // Butonun ripple efektinin olup olmayacağı
    children: ReactNode; // Butonun metni veya içerik
}

const CustomButton: React.FC<CustomButtonProps> = ({
                                                       variant = 'filled',
                                                       size = 'md',
                                                       color = 'blue',
                                                       loading = false,
                                                       icon = null,
                                                       fullWidth = false,
                                                       disabled = false,
                                                       ripple = true,
                                                       children,
                                                       ...props
                                                   }) => {
    return (
        <Button
            placeholder={undefined} onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            variant={variant}
            size={size}
            color={color}
            loading={loading}
            fullWidth={fullWidth}
            disabled={disabled}
            ripple={ripple}
            {...props} // Diğer props'ları da butona geçiriyoruz
            className="flex items-center justify-center gap-2"        >
            {icon && <span className="mr-2">{icon}</span>} {/* Simge varsa, başa ekle */}
            {children} {/* Butonun metni veya içerikleri */}
        </Button>
    );
};

export default CustomButton;
