import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { active_stripe_connect_account, messageClear } from '../store/Reducers/sellerReducerSlice';
import { FadeLoader } from 'react-spinners';
import errorImage from '../assets/error.png';
import successImage from '../assets/success.png';


export default function Success() {
    const {successMessage, errorMessage,loader} = useSelector(state => state.seller)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(window.location.search);
    const activeCode = queryParams.get('activeCode');

    const redirect = () => {
        dispatch(messageClear())
        navigate('/')
    }

    useEffect(() => {
        dispatch(active_stripe_connect_account(activeCode))
    },[dispatch,activeCode])
  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
        {
            loader ? <FadeLoader/> : errorMessage ? <>
            <img className='w-32 h-32' src={errorImage} alt="error" />
            <button onClick={redirect} className='px-5 bg-green-700 rounded-md text-white'>Back to Dashboard</button>
            </>
            : successMessage &&
            <>
            <img className='w-32 h-32' src={successImage} alt="success" />
            <button onClick={redirect} className='px-5 bg-green-700 rounded-md text-white'>Back to Dashboard</button>
            </>
           
        }
    </div>
  )
}
