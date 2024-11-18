import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, PrinterIcon, HomeIcon } from '@heroicons/react/24/outline';
import { Button, Invoice } from '../../components';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type OrderSuccessPageProps = Record<string, never>;

const OrderSuccessPage: React.FC<OrderSuccessPageProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};
  const componentRef = useRef<HTMLDivElement>(null);

  const handleDownloadInvoice = async () => {
    if (!componentRef.current) return;

    try {
      const element = componentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: imgHeight > pageHeight ? 'portrait' : 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );

      pdf.save(`Invoice_${orderDetails?.orderId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order details not found</h1>
          <Button onClick={() => navigate('/')} variant="primary">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Successfully Placed!
          </h1>
          <p className="text-gray-600">
            Thank you for your order. Your order ID is #{orderDetails.orderId}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div ref={componentRef} className="print-content">
            <Invoice orderDetails={orderDetails} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleDownloadInvoice}
            variant="outline"
            icon={<PrinterIcon className="w-5 h-5" />}
          >
            Download Invoice
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="primary"
            icon={<HomeIcon className="w-5 h-5" />}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage; 