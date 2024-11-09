import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, PrinterIcon, HomeIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/common/Button';
import { Invoice } from '../components/invoice/Invoice';
import { useReactToPrint } from 'react-to-print';

const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};
  const invoiceRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: `Invoice_${orderDetails.orderId}`,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Success Message */}
        <div className="text-center mb-12">
          <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Successfully Placed!
          </h1>
          <p className="text-gray-600">
            Thank you for your order. Your order ID is #{orderDetails.orderId}
          </p>
        </div>

        {/* Invoice Preview */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <div ref={invoiceRef}>
              <Invoice orderDetails={orderDetails} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handlePrint}
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