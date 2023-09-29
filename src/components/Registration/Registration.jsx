import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";


const Registration = () => {
    const [user, setUser] = useState()
    const [showError, setShowError] = useState()
    const [showSuccess, setShowSuccess] = useState()
    const handleRegister = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (password.length <= 5) {
            setShowError('Password should be at least 6 characters')
            return;
        }
        setShowError('')
        setShowSuccess('')

        createUserWithEmailAndPassword(auth, email, password)

            .then(result => {
                const logedInuser = result.user;
                setUser(logedInuser)
                setShowSuccess('registration successfull')
            })
            .catch(error => {
                console.error(error);
                setShowError(error.message)
            })
    }
    return (
        <div className="bg-base-200">
            <div className="hero min-h-fit bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Registration now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            {
                showSuccess && <p className="text-center text-green-400">Dear {user.email},{showSuccess}</p>
            }

            {
                showError && <p className="text-center text-red-600">{showError}</p>
            }


        </div >
    );
};

export default Registration;