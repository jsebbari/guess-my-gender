import { useContext, useState, useEffect, useRef } from "react";
import "../../styles/forms.css";
import "./StepTwoForm.css";
import { UserContext } from "../../context/UserContext";

export default function StepTwoForm(props) {
  //context _______________________________________________________________________________
  const { setUser, user } = useContext(UserContext);
  const { gender, probability } = user;

  //states _______________________________________________________________________________
  const [errorMessage, setErrorMessage] = useState(null);
  const [ageValue, setAgeValue] = useState("");

  //ref ___________________________________________________________________________________
  const ageRef = useRef();

  //effects _______________________________________________________________________________
  useEffect(() => {
    if (user.age) {
      setAgeValue(user.age);
    }

    return ageRef.current.focus();
  }, [user]);

  // variables __________________________________________________________________________
  const { setStepToDisplay } = props;

  // functions ____________________________________________________________________________
  const handleChangeAgeInput = (e) => {
    setErrorMessage(null);
    setAgeValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ageValue === "") {
      setErrorMessage("Please, complete all inputs");
    } else if (ageValue === user.age) {
      setErrorMessage(null);
      return setStepToDisplay(2);
    } else {
      setErrorMessage(null);
      setUser({ ...user, age: ageValue });
      return setStepToDisplay(2);
    }
  };

  return (
    <div className="step-two-form">
      <ul className="gender-probability-list">
        <li>
          <p>
            Gender: <span className="gender-probability-items">{gender}</span>
          </p>
        </li>
        <li>
          <p>
            Probability:
            <span className="gender-probability-items">{probability*100} %</span>
          </p>
        </li>
      </ul>
      <form onSubmit={handleSubmit} className="forms">
        {setErrorMessage !== null && (
          <p className="error-message">{errorMessage}</p>
        )}
        <div className="step-two-form-container">
          <input
            type="number"
            name="age"
            id="age"
            onChange={handleChangeAgeInput}
            value={ageValue}
            ref={ageRef}
            placeholder="Age*"
            min="1"
            max="100"
            required
          />
          <button type="submit" className="submit-button">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
