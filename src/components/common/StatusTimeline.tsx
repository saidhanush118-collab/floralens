import React from 'react';
import { CheckCircle2, Clock, Truck, Package, Sparkles, XCircle, AlertCircle } from 'lucide-react';
import { OrderStatus, BookingStatus } from '../../types';

interface OrderTimelineProps {
  type: 'order';
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
}

interface BookingTimelineProps {
  type: 'booking';
  status: BookingStatus;
  createdAt: string;
  eventDate?: string;
  timeSlot?: string;
}

type TimelineProps = OrderTimelineProps | BookingTimelineProps;

export const StatusTimeline: React.FC<TimelineProps> = (props) => {
  if (props.type === 'order') {
    const steps: { key: OrderStatus[]; label: string; icon: React.ReactNode; desc: string }[] = [
      {
        key: ['pending_payment', 'payment_processing', 'confirmed'],
        label: 'Order Confirmed',
        icon: <CheckCircle2 className="w-5 h-5" />,
        desc: 'Payment captured and order verified',
      },
      {
        key: ['accepted_by_vendor', 'preparing'],
        label: 'Freshly Handcrafted',
        icon: <Package className="w-5 h-5" />,
        desc: 'Florist is arranging your fresh blooms',
      },
      {
        key: ['ready_for_dispatch', 'out_for_delivery'],
        label: 'Out for Delivery',
        icon: <Truck className="w-5 h-5" />,
        desc: 'Partner courier is on the way',
      },
      {
        key: ['delivered'],
        label: 'Delivered with Love',
        icon: <Sparkles className="w-5 h-5" />,
        desc: 'Delivered at recipient address',
      },
    ];

    const isCancelled = props.status === 'cancelled';
    const isRefunded = props.status === 'refunded' || props.status === 'refund_pending';

    if (isCancelled || isRefunded) {
      return (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-center gap-3">
          <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-red-900">
              {isCancelled ? 'Order Cancelled' : 'Order Refunded'}
            </h4>
            <p className="text-xs text-red-700">
              {isCancelled
                ? 'This order has been cancelled.'
                : 'Payment refund has been processed to your source account.'}
            </p>
          </div>
        </div>
      );
    }

    // Determine current step index
    let currentStepIdx = 0;
    if (['accepted_by_vendor', 'preparing'].includes(props.status)) currentStepIdx = 1;
    if (['ready_for_dispatch', 'out_for_delivery'].includes(props.status)) currentStepIdx = 2;
    if (props.status === 'delivered') currentStepIdx = 3;

    return (
      <div className="py-4">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-0">
            <div
              className="h-full bg-botanical-600 transition-all duration-500"
              style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {steps.map((step, idx) => {
            const isCompleted = idx <= currentStepIdx;
            const isCurrent = idx === currentStepIdx;

            return (
              <div key={idx} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-botanical-600 text-white shadow-md shadow-botanical-600/30 ring-4 ring-botanical-100'
                      : 'bg-white text-slate-400 border-2 border-slate-300'
                  }`}
                >
                  {step.icon}
                </div>
                <div className="text-center mt-2 max-w-[90px]">
                  <p
                    className={`text-xs font-semibold ${
                      isCurrent ? 'text-botanical-800 font-bold' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Booking Timeline
  const bookingSteps: { key: BookingStatus[]; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      key: ['pending_payment', 'pending_approval', 'confirmed'],
      label: 'Slot Reserved',
      icon: <CheckCircle2 className="w-5 h-5" />,
      desc: 'Booking slot locked for your event date',
    },
    {
      key: ['accepted_by_vendor', 'preparing'],
      label: 'Vendor Accepted',
      icon: <Clock className="w-5 h-5" />,
      desc: 'Decorator team preparing floral props & supplies',
    },
    {
      key: ['setup_in_progress'],
      label: 'Setup in Progress',
      icon: <Sparkles className="w-5 h-5" />,
      desc: 'Crew on venue installing decoration setup',
    },
    {
      key: ['completed'],
      label: 'Celebration Ready',
      icon: <CheckCircle2 className="w-5 h-5" />,
      desc: 'Event setup completed and handed over',
    },
  ];

  const isRejected = props.status === 'rejected';
  const isCancelled = props.status === 'cancelled';

  if (isRejected || isCancelled) {
    return (
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-3">
        <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-amber-950">
            {isRejected ? 'Booking Request Declined' : 'Booking Cancelled'}
          </h4>
          <p className="text-xs text-amber-800">
            {isRejected
              ? 'The decorator could not accommodate this booking. Refund will be credited.'
              : 'This booking has been cancelled.'}
          </p>
        </div>
      </div>
    );
  }

  let currentBookingIdx = 0;
  if (['accepted_by_vendor', 'preparing'].includes(props.status)) currentBookingIdx = 1;
  if (props.status === 'setup_in_progress') currentBookingIdx = 2;
  if (props.status === 'completed') currentBookingIdx = 3;

  return (
    <div className="py-4">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-0">
          <div
            className="h-full bg-botanical-600 transition-all duration-500"
            style={{ width: `${(currentBookingIdx / (bookingSteps.length - 1)) * 100}%` }}
          />
        </div>

        {bookingSteps.map((step, idx) => {
          const isCompleted = idx <= currentBookingIdx;
          const isCurrent = idx === currentBookingIdx;

          return (
            <div key={idx} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-botanical-600 text-white shadow-md shadow-botanical-600/30 ring-4 ring-botanical-100'
                    : 'bg-white text-slate-400 border-2 border-slate-300'
                }`}
              >
                {step.icon}
              </div>
              <div className="text-center mt-2 max-w-[90px]">
                <p
                  className={`text-xs font-semibold ${
                    isCurrent ? 'text-botanical-800 font-bold' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
