import { loadStripe } from "@stripe/stripe-js";
import Title from "../../../Components/Shared/Title";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Make sure your VITE_Payment_Gateway_PK variable is correctly set in the .env file
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK || 'pk_test_YourDefaultTestKey');


const Payment = () => {
    // Log the stripe public key to verify it's being loaded correctly
    console.log(import.meta.env.VITE_Payment_Gateway_PK);

    return (
        <div>
            <Title heading="Payment" subHeading="Please pay to buy"></Title>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
