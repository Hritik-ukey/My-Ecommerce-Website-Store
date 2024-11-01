import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Payment = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    address: "",
    country: "",
    city: "",
    state: "",
    pincode: "",
    totalAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const shipping_address = {
      first_name: formData.fname,
      last_name: formData.lname,
      address: formData.address,
      email: formData.email,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      postcode: formData.pincode,
      phone_number: formData.mobile,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    var options = {
      key: "rzp_test_vv1FCZvuDRF6lQ",
      key_secret: "P4JAUwn4VdE6xDLJ6p2Zy8RQ",
      amount: parseInt(formData.totalAmount) * 100,
      currency: "INR",
      name: "Web Mastery",
      description: "for testing purpose",
      handler: function (response) {
        const paymentId = response.razorpay_payment_id;
        console.log("Payment ID:", paymentId, shipping_address);
        setFormData({
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          address: "",
          country: "",
          city: "",
          state: "",
          pincode: "",
          totalAmount: "",
        });
      },
      theme: {
        color: "#07a291db",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div className="pb-10">
        <p>Payment gateway only applicable for Production build.</p>
        <Link to="/">
          <button className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
            Explore More
          </button>
        </Link>
      </div>

      <div className="container d-flex justify-content-center mt-5">
        <div className="card p-4 shadow-lg" style={{ width: "60%" }}>
          <h2 className="mb-4 text-center" style={{ color: "#07a291db" }}>
            Checkout Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
            {[
              { name: "fname", placeholder: "First Name" },
              { name: "lname", placeholder: "Last Name" },
              { name: "email", placeholder: "Email", type: "email" },
              { name: "mobile", placeholder: "Mobile", type: "number", minLength: 10, maxLength: 10 },
              { name: "address", placeholder: "Address", colSpan: 2 },
              { name: "country", placeholder: "Country" },
              { name: "city", placeholder: "City" },
              { name: "state", placeholder: "State" },
              { name: "pincode", placeholder: "Pincode" },
              { name: "totalAmount", placeholder: "Total Amount", type: "number" },
            ].map(({ name, placeholder, type = "text", colSpan = 1 }) => (
              <div className={`col-span-${colSpan} w-full`} key={name}>
                <input
                  type={type}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primeColor"
                  placeholder={placeholder}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-primeColor text-white font-semibold rounded-lg hover:bg-primeHover transition duration-300"
          >
            Checkout
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
