import React from 'react'
import "../../stylesheets/stripes.css"
function ContactStripe() {
    return (
        <div className="safeStripe">
            <p>Contacts</p>
            <div style={{display:"flex",width:"300px"}}>
            <button className="custodyAddbtn"><span className="plusdiv">+</span> Person</button>
            <button className="custodyAddbtn"><span className="plusdiv">+</span> Organisation</button>
            </div>
            
        </div>
    )
}

export default ContactStripe
