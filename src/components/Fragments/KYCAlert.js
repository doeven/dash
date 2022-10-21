import { render } from '@testing-library/react';
import React from 'react';
import { Link } from 'react-router-dom';

function KYCAlert(){
    return(
                <div className="alert alert-warning">
                    <div className="alert-cta flex-wrap flex-md-nowrap">
                        <div className="alert-text">
                            <p>You have to verify your identity by Uploading your KYC Documents to use features on this platform.</p>
                        </div>
                        <ul className="alert-actions gx-3 mt-3 mb-1 my-md-0">
                            <li className="order-md-last">
                                <Link to="/kyc-update" className="btn btn-sm btn-warning">Verify Now</Link>
                            </li>
                            {/* <li>
                                <a href="#" className="link link-primary">Learn More</a> 
                            </li>*/}
                        </ul>
                    </div>
                </div>
    );
}

export default KYCAlert;