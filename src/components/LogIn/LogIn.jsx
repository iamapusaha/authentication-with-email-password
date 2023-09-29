import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const LogIn = () => {
    const [showError, setShowError] = useState('')
    const [showSuccess, setShowSuccess] = useState('')
    const emailRef = useRef(null)
    const handleLogIn = e => {
        e.preventDefault()

        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        setShowError('')
        setShowSuccess('')
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const logInUser = result.user;
                console.log(logInUser);
                if (logInUser.emailVerified) {
                    setShowSuccess('LogIn successfull')

                } else {
                    alert('please go to your mail and varified your account')
                }

            })
            .catch(error => {
                console.error(error)
                setShowError(error.message)
            })
    }
    const handleForGetPassword = () => {

        const email = emailRef.current.value;
        console.log(email);
        if (!email) {
            alert('please provide a valid email', email);
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(email)) {
            alert('please provide a valid emial address')
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {

                setShowError(error.message)
            });


    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogIn}>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    ref={emailRef}
                                    placeholder="email"
                                    className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a onClick={handleForGetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <p>Not registered? <Link to='/registration'>Create account</Link></p>
                        {
                            showSuccess && <p className="text-center text-green-400">{showSuccess}</p>
                        }

                        {
                            showError && <p className="text-center text-red-600">{showError}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;