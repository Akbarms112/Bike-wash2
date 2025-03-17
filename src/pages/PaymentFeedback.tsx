import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, DollarSign, Send, CheckCircle, Smartphone } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PaymentFeedback: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { booking } = useBooking();
  
  const [activeTab, setActiveTab] = useState<"payment" | "feedback">("payment");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash" | "upi" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    if (!booking) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, booking, navigate]);

  const handlePayment = () => {
    if (!paymentMethod) return;

    if (paymentMethod === "upi") {
      window.location.href = "https://rzp.io/rzp/sE0OKew4"; // Redirect to Razorpay UPI link
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setActiveTab("feedback");
    }, 1500);
  };

  if (!booking) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-16 flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("payment")}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium ${
                  activeTab === "payment" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Payment
              </button>
              <button
                onClick={() => setActiveTab("feedback")}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium ${
                  activeTab === "feedback" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                disabled={activeTab === "payment"}
              >
                Feedback
              </button>
            </div>
          </div>

          {activeTab === "payment" && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Service Charge</span>
                  <span className="font-medium">${booking.washCenter?.price || 0}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Pickup & Delivery</span>
                  <span className="font-medium">$10</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${((booking.washCenter?.price || 0) + 10) * 0.1}</span>
                </div>
                <div className="border-t border-gray-200 my-2 pt-2"></div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Amount</span>
                  <span className="font-bold text-lg">${((booking.washCenter?.price || 0) + 10) * 1.1}</span>
                </div>
              </div>

              <h3 className="text-lg font-medium mb-3">Select Payment Method</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center p-4 border rounded-md ${
                    paymentMethod === "card" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-300"
                  }`}
                >
                  <CreditCard className={`h-6 w-6 mr-3 ${paymentMethod === "card" ? "text-blue-500" : "text-gray-500"}`} />
                  <div className="text-left">
                    <p className={`font-medium ${paymentMethod === "card" ? "text-blue-700" : "text-gray-700"}`}>Credit/Debit Card</p>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`flex items-center p-4 border rounded-md ${
                    paymentMethod === "cash" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-300"
                  }`}
                >
                  <DollarSign className={`h-6 w-6 mr-3 ${paymentMethod === "cash" ? "text-blue-500" : "text-gray-500"}`} />
                  <div className="text-left">
                    <p className={`font-medium ${paymentMethod === "cash" ? "text-blue-700" : "text-gray-700"}`}>Cash on Delivery</p>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex items-center p-4 border rounded-md ${
                    paymentMethod === "upi" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-300"
                  }`}
                >
                  <Smartphone className={`h-6 w-6 mr-3 ${paymentMethod === "upi" ? "text-blue-500" : "text-gray-500"}`} />
                  <div className="text-left">
                    <p className={`font-medium ${paymentMethod === "upi" ? "text-blue-700" : "text-gray-700"}`}>Pay via UPI</p>
                  </div>
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={handlePayment}
                  disabled={!paymentMethod || isSubmitting}
                  className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {paymentMethod === "upi" ? "Proceed to Razorpay" : "Proceed to Payment"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentFeedback;
