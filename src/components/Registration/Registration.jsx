import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";


const Registration = () => {
    const [show, setShow] = useState(false)
    // const [user, setUser] = useState()
    const [showError, setShowError] = useState('')
    const [showSuccess, setShowSuccess] = useState('')
    const handleRegister = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password);
        setShowError('')
        setShowSuccess('')
        if (password.length <= 5) {
            setShowError('Password should be at least 6 characters')
            return;
        } else if (!/[A-Z]/.test(password)) {
            setShowError('Password does not contain at least one uppercase letter.')
            return;
        } else if (!accepted) {
            setShowError('plase accepted our Terms and Conditions')
            return;
        }


        createUserWithEmailAndPassword(auth, email, password)

            .then(result => {
                const logInUser = result.user;
                // setUser(logInUser)
                console.log(logInUser);
                setShowSuccess('registration successfull')
                updateProfile(logInUser, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                    .then(() => {
                        console.log('profile updated');
                    })
                sendEmailVerification(logInUser)
                    .then(() => {
                        alert('please go to your email and verified you account');
                    });
            })
            .catch(error => {
                console.error(error);
                setShowError(error.message)
            })
    }
    return (

        <div className="hero min-h-screen bg-base-200">
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
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="name"
                                    className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered w-11/12 " required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="flex items-center relative">
                                    <input
                                        type={show ? 'text' : 'password'}
                                        name="password"
                                        placeholder="password"
                                        className="input input-bordered w-11/12" required />
                                    <span className="absolute right-8 " onClick={() => setShow(!show)}>
                                        {
                                            show ? <FiEyeOff></FiEyeOff> : <FiEye></FiEye>
                                        }
                                    </span>
                                </div>

                            </div>
                            <div>
                                <input type="checkbox" name="terms" id="" />
                                <label htmlFor="terms"> i agree the <a href=""> Terms and Conditions</a></label>
                            </div>
                            <div className="form-control mt-6 w-11/12">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        <p>Already have an account? <Link to='/login'>Sign In</Link></p>
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

export default Registration;