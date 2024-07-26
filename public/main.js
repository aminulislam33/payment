document.addEventListener('DOMContentLoaded', function() {
  // Get the form element
  const form = document.getElementById('paymentForm');

  // Add a submit event listener to the form
  form.addEventListener('submit', async function(event) {
      event.preventDefault(); // Prevent the default form submission

      // Create an order by making a POST request to the backend
      const response = await fetch('/api/create-order', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ amount: 500 }) // Amount in INR
      });

      const order = await response.json(); // Get the order details from the backend

      const options = {
          key: "rzp_test_sdaGudTbINbSo4", // Replace with your Razorpay key ID
          amount: order.amount,
          currency: "INR",
          name: "Your Company Name",
          description: "Test Transaction",
          order_id: order.id, // Order ID from Razorpay
          handler: function (response) {
              // Handle the payment success response
              alert(`Payment ID: ${response.razorpay_payment_id}`);
              alert(`Order ID: ${response.razorpay_order_id}`);
              alert(`Signature: ${response.razorpay_signature}`);
          },
          prefill: {
              name: "Your Name",
              email: "email@example.com",
              contact: "9999999999"
          },
          notes: {
              address: "Razorpay Corporate Office"
          },
          theme: {
              color: "#F37254"
          }
      };

      const rzp1 = new Razorpay(options);
      rzp1.open(); // Open the Razorpay payment modal
  });
});