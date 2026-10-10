import React, { useState } from 'react';
import { X, ShieldCheck, QrCode, CreditCard, Landmark, CheckCircle, AlertCircle, Smartphone } from 'lucide-react';
import { PaymentMethod } from '../../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderDescription: string;
  onSuccess: (paymentDetails: { reference: string; method: PaymentMethod }) => void;
  onFailure?: (error: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  orderDescription,
  onSuccess,
  onFailure,
}) => {
  const [selectedTab, setSelectedTab] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('981');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  if (!isOpen) return null;

  const handleSimulatePayment = (success: boolean) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (success) {
        const reference = `RZP-PAY-${Math.floor(100000 + Math.random() * 900000)}`;
        onSuccess({
          reference,
          method: selectedTab,
        });
      } else {
        if (onFailure) {
          onFailure('Payment declined by issuing bank (Simulated Test Rejection).');
        }
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-botanical-800 to-botanical-700 p-5 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                Razorpay Sandbox
              </span>
              <span className="text-xs text-botanical-200">Test Environment</span>
            </div>
            <h3 className="text-xl font-display font-semibold mt-1">Bloomora Secure Payment</h3>
            <p className="text-xs text-botanical-200 line-clamp-1">{orderDescription}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-botanical-300 block">Total Payable</span>
            <span className="text-2xl font-bold font-sans text-white">₹{amount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Payment Methods Navigation */}
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          <button
            type="button"
            onClick={() => setSelectedTab('upi')}
            className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
              selectedTab === 'upi'
                ? 'border-botanical-600 text-botanical-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-600" />
            UPI / QR Code
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab('card')}
            className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
              selectedTab === 'card'
                ? 'border-botanical-600 text-botanical-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4 text-blue-600" />
            Cards (RuPay / Visa)
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab('netbanking')}
            className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
              selectedTab === 'netbanking'
                ? 'border-botanical-600 text-botanical-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Landmark className="w-4 h-4 text-amber-600" />
            Net Banking
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {selectedTab === 'upi' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-botanical-50/60 border border-botanical-100">
                <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-200">
                  <QrCode className="w-16 h-16 text-botanical-800" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-botanical-900">Scan UPI QR Code</h4>
                  <p className="text-xs text-botanical-700 mt-1">
                    Scan with Google Pay, PhonePe, Paytm, or CRED to approve ₹{amount.toLocaleString('en-IN')}.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] bg-white border border-slate-200 text-slate-600 font-bold px-1.5 py-0.5 rounded">GPay</span>
                    <span className="text-[10px] bg-white border border-slate-200 text-slate-600 font-bold px-1.5 py-0.5 rounded">PhonePe</span>
                    <span className="text-[10px] bg-white border border-slate-200 text-slate-600 font-bold px-1.5 py-0.5 rounded">Paytm</span>
                    <span className="text-[10px] bg-white border border-slate-200 text-slate-600 font-bold px-1.5 py-0.5 rounded">BHIM</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400">or enter UPI ID</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Virtual Payment Address (VPA)</label>
                <input
                  type="text"
                  placeholder="yourname@okhdfcbank"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-botanical-500"
                />
              </div>
            </div>
          )}

          {selectedTab === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4532 0000 0000 8892"
                  className="w-full text-sm font-mono px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-botanical-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="12/28"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-botanical-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CVV</label>
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="•••"
                    maxLength={4}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-botanical-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Supports RuPay Debit & Credit, Visa, Mastercard, AMEX</span>
              </div>
            </div>
          )}

          {selectedTab === 'netbanking' && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700">Select Popular Indian Bank</label>
              <div className="grid grid-cols-2 gap-2">
                {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map(
                  (bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      className={`p-3 text-left rounded-lg text-xs font-medium border transition-all ${
                        selectedBank === bank
                          ? 'border-botanical-600 bg-botanical-50/80 text-botanical-900 font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {bank}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Test Action Controls */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => handleSimulatePayment(true)}
              className="w-full py-3 px-4 bg-botanical-600 hover:bg-botanical-700 active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Simulate Successful Payment (₹{amount.toLocaleString('en-IN')})
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => handleSimulatePayment(false)}
              className="w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-700 font-medium text-xs rounded-xl border border-red-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              Simulate Failed / Rejected Payment (Test error recovery)
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              256-bit SSL Encrypted
            </span>
            <button
              type="button"
              onClick={onClose}
              className="hover:text-slate-600 font-medium underline"
            >
              Cancel Payment
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-botanical-200 hover:text-white p-1 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
