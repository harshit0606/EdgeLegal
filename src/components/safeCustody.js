import react,{useState} from "react";
import styles from "../stylesheets/safeCustody.css";

function RenderSafeCustody(){
    
    function renderSafeSelectTop(){
        return (
            <div>
                <h1>renderSafeSelectTop</h1>
            </div>
        );
    }

    function renderSafeContactsTop(){
        return (
            <div>
                <h1>renderSafeContactsTop</h1>
            </div>
        );
    }

    function renderSafeContentsTop(){
        return (
            <div>
                <h1>renderSafeContentsTop</h1>
            </div>
        );
    }

    function renderSafeRecepientsTop(){
        return (
            <div>
                <h1>renderSafeRecepientsTop</h1>
            </div>
        );
    }

    function renderSafeSelect(){
        return (
            <div>
                <h1>Select File</h1>
                <input type="text" value={a} onChange={(e)=>{setA(e.target.value)}}></input>
            </div>
        );
    }
    
    function renderSafeContacts(){
        return (
            <div>
                <h1>Contacts</h1>
                <input type="text" value={b} onChange={(e)=>{setB(e.target.value)}}></input>
            </div>
        );
    }
    
    function renderSafeContents(){
        var x = "client";
        return (
            <div>
                <h1>Contents</h1>
                <label for="contents">Contents</label>
                <textarea rows="2" columns="5" id="contents"></textarea>
                <label>First Name</label>
                {x==="primary" && (<input readOnly placeholder="some name" />)}
                {x==="client" && (<input placeholder="some name" />)}
                {/* {x==="primary" ? <input readOnly>some name</input> : <input>some name</input>} */}
                
                <label>Last Name</label>
                <label>Contact Type</label>
                <label>Address</label>
            </div>
        );
    }

    function renderSafeRecepients(){
        return (
            <div>
                <h1>Recepients</h1>
                <input type="text" value={d} onChange={(e)=>{setD(e.target.value)}}></input>
            </div>
        );
    }

    const [currentSafe,setCurrentSafe] = useState("select");
    const [a,setA] = useState(null);
    const [b,setB] = useState(null);
    const [c,setC] = useState(null);
    const [d,setD] = useState(null);

    return (
        <div>
            <div className="safe-custody-div">

                {currentSafe==="select" && renderSafeSelectTop()}
                {currentSafe==="contacts" && renderSafeContactsTop()}
                {currentSafe==="contents" && renderSafeContentsTop()}
                {currentSafe==="recepients" && renderSafeRecepientsTop()}

                <div className="safe-custody-btns-div">
                    <button className={currentSafe==="select" ? "safe-custody-btns safe-custody-btns-clicked" : "safe-custody-btns" } onClick={()=>{setCurrentSafe("select")}}> &nbsp; &nbsp; &nbsp; Select File</button><br />
                    <button className={currentSafe==="contacts" ? "safe-custody-btns safe-custody-btns-clicked" : "safe-custody-btns" } onClick={()=>{setCurrentSafe("contacts")}}> &nbsp; &nbsp; &nbsp; Contacts</button><br />
                    <button className={currentSafe==="contents" ? "safe-custody-btns safe-custody-btns-clicked" : "safe-custody-btns" } onClick={()=>{setCurrentSafe("contents")}}> &nbsp; &nbsp; &nbsp; Contents</button><br />
                    <button className={currentSafe==="recepients" ? "safe-custody-btns safe-custody-btns-clicked" : "safe-custody-btns" } onClick={()=>{setCurrentSafe("recepients")}}> &nbsp; &nbsp; &nbsp; Recepients</button><br />
                </div>

                {currentSafe==="select" && renderSafeSelect()}
                {currentSafe==="contacts" && renderSafeContacts()}
                {currentSafe==="contents" && renderSafeContents()}
                {currentSafe==="recepients" && renderSafeRecepients()}

            </div>
        </div>
    );
}

export default RenderSafeCustody