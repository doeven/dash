import React from 'react';

function TransDescription(props){

    if(props.trans_type > 0 && props.trans_type <= 10){
        return(
            <span className="badge badge-success">{props.desc}</span>
        );
    }else if(props.trans_type >10 && props.trans_type <21){
        return(
            <span className="badge badge-danger">{props.desc}</span>
        );
    } else {
        return(
            <span className="badge badge-success">{props.desc}</span>
        );
    }
}

export default TransDescription;