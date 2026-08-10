import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { CheckoutElementsProvider } from '@stripe/react-stripe-js/checkout';
import CheckoutForm from './CheckoutForm';




function Checckout() {
    const [stripe,setStripe] = useState(null)
    const handlePayment = async () => {
        try {
            const result = await loadStripe(import.meta.env.VITE_STRIPE_KEY)
            console.log(result);
            setStripe(result)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        handlePayment()
    }, [])
    return (
        <CheckoutElementsProvider stripe={stripe} options={{clientSecret: import.meta.env.VITE_STRIPE_KEY_SK}}>
            <CheckoutForm/>
        </CheckoutElementsProvider>
    )
}

export default Checckout