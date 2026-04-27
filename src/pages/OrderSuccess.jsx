import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import API from "../api/axios"
import { CheckCircle, Package, Truck, Utensils } from "lucide-react" // Icons
import { useCartStore } from "../store/useCartStore"

const OrderSuccess = () => {
  const { id: orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/order/${orderId}`)
        setOrder(data)
        clearCart()
      } catch (err) {
        console.error("Error fetching order:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [orderId])

  if (loading)
    return <div className="text-center py-20">Updating order status...</div>
  if (!order) return <div className="text-center py-20">Order not found.</div>

  const statusSteps = ["placed", "preparing", "ready", "delivered"]
  const currentStep = statusSteps.indexOf(order.orderStatus)

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="bg-green-500 p-8 text-center text-white">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 animate-bounce" />
          <h1 className="text-3xl font-black">Order Confirmed!</h1>
          <p className="opacity-90 mt-2 text-lg">Order #{order.orderNumber}</p>
        </div>

        {/* Status Tracker */}
        <div className="p-8 border-b">
          <div className="flex justify-between items-center relative">
            {statusSteps.map((step, index) => (
              <div key={step} className="flex flex-col items-center z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${
                    index <= currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step === "placed" && <Package size={20} />}
                  {step === "preparing" && <Utensils size={20} />}
                  {step === "ready" && <CheckCircle size={20} />}
                  {step === "delivered" && <Truck size={20} />}
                </div>
                <p
                  className={`text-xs mt-2 font-bold uppercase tracking-tighter ${
                    index <= currentStep ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {step}
                </p>
              </div>
            ))}
            {/* Background Line */}
            <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-0"></div>
            <div
              className="absolute top-5 left-0 h-1 bg-green-500 transition-all duration-1000 -z-0"
              style={{
                width: `${(currentStep / (statusSteps.length - 1)) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Order Details */}
        <div className="p-8">
          <h2 className="font-bold text-xl mb-4 text-gray-800">Summary</h2>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-gray-600">
                <span>
                  {item.name}{" "}
                  <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded ml-2">
                    {item.size}
                  </span>{" "}
                  x {item.quantity}
                </span>
                <span className="font-mono">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t pt-3 mt-3 flex justify-between font-black text-2xl text-gray-900">
              <span>Paid via {order.paymentMethod.toUpperCase()}</span>
              <span className="text-green-600">₹{order.totalAmount}</span>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gray-50 flex flex-col gap-3">
          <p className="text-sm text-center text-gray-500 mb-2">
            We’ve sent a confirmation to your phone.
          </p>
          <Link
            to="/"
            className="block w-full text-center bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-colors"
          >
            Order More Food
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
