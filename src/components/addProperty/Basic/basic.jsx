import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { idContext } from "../../context/id_context";
import Header from "../../header/header";
import Sidebar from "../../sidebar/sidebar";
import "./basic.css";
const BasicInfoForm = () => {

    const basicContext = useContext(idContext);
    // console.log(basicContext);

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        property: "plot",
        negotable: "yes",
        price: "",
        ownership: "self",
        propertyAge: "",
        propertyApproved: "yes",
        propertyDescription: "",
        bankLoan: "no"
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleClear = () => {
        setFormValues({
            property: "plot",
            negotable: "yes",
            price: "",
            ownership: "self",
            propertyAge: "",
            propertyApproved: "yes",
            propertyDescription: "",
            bankLoan: "no"
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch('http://localhost:8001/api/pro/basic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
        }).then(res => {
            return res.json();
        }).then(data => {
            // console.log(data);
            basicContext.setbasicid(data.basicdetails._id);
            navigate("/propertyinfo")
        }).catch(e => {
            console.log(e)
        })
    };

    return (

        <>
            <Header />
            <Sidebar />
            <h3>ADD NEW PROPERTY</h3>
            <div className="basic-info-row">
                <ul className="basic-ul-row">
                    <li className="basic-li">Basic info</li>
                    <li>Property Details</li>
                    <li>General Info</li>
                    <li>Location Info</li>
                </ul>
            </div>
            <div className="basic-form-container">
                <form onSubmit={handleSubmit}>
                    <div className="basic-form-flexbox">
                        <div>
                            <label>
                                Property Type  <span style={{ color: "red" }}>*</span>:
                                <select name="property" value={formValues.property} onChange={handleInputChange} required>
                                    <option value="plot">Plot</option>
                                    <option value="house">House</option>
                                    <option value="flat">Flat</option>
                                </select>
                            </label>

                            <label> Negotiable:
                                <select name="negotable" value={formValues.negotable} onChange={handleInputChange}>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </label>
                        </div>

                        <div>
                            <label>
                                Price <span style={{ color: "red" }}>*</span>:
                                <input type="number" name="price" value={formValues.price} onChange={handleInputChange} required />
                            </label>

                            <label>
                                Ownership:
                                <select name="ownership" value={formValues.ownership} onChange={handleInputChange}>
                                    <option value="dealer">Dealer</option>
                                    <option value="self">Self</option>
                                </select>
                            </label>
                        </div>

                        <div>
                            <label>
                                Property Age <span style={{ color: "red" }}>*</span>:
                                <input type="number" name="propertyAge" value={formValues.propertyAge} onChange={handleInputChange} min={2} required />
                            </label>

                            <label>
                                Property Approved:
                                <select name="propertyApproved" value={formValues.propertyApproved} onChange={handleInputChange}>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </label>
                        </div>

                        <div>
                            <label>
                                Property Description:
                                <textarea name="propertyDescription" value={formValues.propertyDescription} onChange={handleInputChange} />
                            </label>

                            <label>
                                Bank Loan:
                                <select name="bankLoan" value={formValues.bankLoan} onChange={handleInputChange}>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </label>
                        </div>

                        <div>
                            <button onClick={handleClear}>Clear</button>
                        </div>
                        <div>
                            <button type="submit">Save & continue</button>
                        </div>

                    </div>
                </form>
            </div >
        </>
    );
}


export default BasicInfoForm;