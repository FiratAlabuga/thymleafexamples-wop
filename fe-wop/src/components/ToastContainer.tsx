import React from 'react';
import {ToastContainer as ReactToastContainer} from 'react-toastify'; // react-toastify'den ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Stil dosyasını import ediyoruz

const ToastContainer: React.FC = () => {
    return (
        <ReactToastContainer
            position="top-right" // Konum
            autoClose={5000} // Otomatik kapanma süresi
            hideProgressBar={false} // Yükleme çubuğunu gizleme
            newestOnTop={false} // En yeni toast üstte görünsün mü?
            closeOnClick // Toast'a tıklanınca kapanması
            rtl={false} // Sağdan sola yazı yönü (Türkçe gibi diller için kullanılır)
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
};

export default ToastContainer;
