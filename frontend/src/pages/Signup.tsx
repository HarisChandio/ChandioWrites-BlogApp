import React from 'react';
import { Quote } from '../components/Quote';
import { Auth } from '../components/Auth';
const Signup = () => {
    return (
        <div className='grid grid-cols-2'>
            <div>
                <Auth></Auth>
            </div>
            <div className='invisible md:visible'>
                <Quote></Quote>
            </div>
        </div>
    );
};

export default Signup;