import React, {useState, useContext} from "react";
import { FireBaseContext } from "../FireBase";
import { Link , useNavigate} from "react-router-dom";


const ForgetPassword = () => {

    const firebase = useContext(FireBaseContext);
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const disabled = email === ""

    const handleSubmit = e => {
        e.preventDefault()
        firebase.passwordReset(email)
        .then(() => {
            
            setError(null)
            setSuccess("Consultez vos emails pour changer le mot de passe")
            setEmail('')
            setTimeout(() => {
                navigate('/login')
            }, 5000);
            
        })
        .catch(error => {
            setError(error)
            setEmail('')
        })
    };
    return (
        <div className="signUpLoginBox">
        <div className="slContainer">
            <div className="formBoxLeftForget"></div>

            <div className="formBoxRight">
                <div className="formContent">

                    {success && <span 
                    style={{
                    border:"1px solid green",
                    background: " green", 
                    color: "white"}}>{success}</span>}

                    {error && <span>{error.message}</span>}

                    <h2>Mot de passe oublié ?</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="inputBox">
                            <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            id="email"
                            autoComplete="off"
                            required
                            />
                            <label htmlFor="email">Email</label>
                        </div>

                        <button disabled={disabled}>Valider</button>
                    </form>

                    <div className="linkContainer">
                        <Link className="simpleLink" to="/login">
                            Deja inscrit? Connectez-vous.
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ForgetPassword;
