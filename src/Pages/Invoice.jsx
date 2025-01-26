import React, { useContext, useEffect, useState } from "react";
import { jsPDF } from "jspdf"; // For generating PDFs
import "jspdf-autotable"; // For structured PDF tables
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../Hooks/UseAxiosPublic";
import { Helmet } from "react-helmet";

const Invoice = () => {
  const { user } = useContext(AuthContext); // Get user data from context
  const axiosPublic = useAxiosPublic(); // Axios hook for fetching data
  const [paymentData, setPaymentData] = useState(null); // Store payment data

  // Fetch payment data on component mount
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/payments/${user.email}`)
        .then((res) => {
          console.log("Payment Data:", res.data);
          setPaymentData(res.data);
        })
        .catch((err) => console.error("Error fetching payment data:", err));
    }
  }, [user, axiosPublic]);

  // Generate PDF using jsPDF and autotable
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Invoice", 14, 10); // Add a title

    paymentData.forEach((payment, index) => {
      const tableData = payment.ItemName?.map((itemName, idx) => [
        idx + 1,
        itemName,
        `$${payment.perUnitPrice || 0}`,
        1, // Assuming quantity as 1
        `$${(payment.perUnitPrice || 0).toFixed(2)}`,
      ]);

      // Add Purchase Details Table
      doc.text(`Purchase Details (Payment #${index + 1})`, 14, doc.lastAutoTable.finalY + 10 || 20);
      doc.autoTable({
        head: [["#", "Item Name", "Price", "Quantity", "Total"]],
        body: tableData || [["No items found"]],
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 20,
      });

      // Add payment info (Total Amount, Transaction ID, Status)
      doc.text(`Total Amount: $${payment.price}`, 14, doc.lastAutoTable.finalY + 10);
      doc.text(`Transaction ID: ${payment.transactionId}`, 14, doc.lastAutoTable.finalY + 20);
      doc.text(`Status: ${payment.status}`, 14, doc.lastAutoTable.finalY + 30);

      if (index < paymentData.length - 1) {
        doc.addPage(); // Add a new page if it's not the last payment
      }
    });

    doc.save(`invoice_${paymentData[0]?.transactionId || "default"}.pdf`);
  };

  // Show loading while fetching data
  if (!paymentData) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>PharmaCare | Invoice</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    <div className="max-w-3xl mx-auto p-6">
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Invoice Header */}
      <header className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">Invoice</h2>
        <p className="text-gray-500">Thank you for your purchase!</p>
      </header>

      {/* User Information */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">User Information</h3>
        <p><strong>Name:</strong> {user.displayName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address || "Not Provided"}</p>
      </section>

      {/* Payment Details */}
      {paymentData.map((payment, index) => (
        <section key={payment._id} className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Purchase Details (Payment #{index + 1})
          </h3>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border-b">#</th>
                <th className="px-4 py-2 text-left border-b">Item Name</th>
                <th className="px-4 py-2 text-left border-b">Price</th>
                <th className="px-4 py-2 text-left border-b">Quantity</th>
                <th className="px-4 py-2 text-left border-b">Total</th>
              </tr>
            </thead>
            <tbody>
              {payment.ItemName?.map((itemName, itemIndex) => (
                <tr key={payment.cartIds[itemIndex]}>
                  <td className="px-4 py-2 border-b">{itemIndex + 1}</td>
                  <td className="px-4 py-2 border-b">{itemName}</td>
                  <td className="px-4 py-2 border-b">${payment.perUnitPrice || 0}</td>
                  <td className="px-4 py-2 border-b">1</td>
                  <td className="px-4 py-2 border-b">
                    ${(payment.perUnitPrice || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}

      {/* Download Button */}
      <footer className="text-center mt-6">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          onClick={generatePDF}
        >
          Download Invoice as PDF
        </button>
      </footer>
    </div>
  </div></>
  );
};

export default Invoice;
