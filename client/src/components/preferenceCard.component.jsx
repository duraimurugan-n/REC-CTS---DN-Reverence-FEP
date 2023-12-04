import React from "react";
import axios from "axios";
import Card from '../components/card.component.jsx';
import { ButtonBase } from "@mui/material";

const changePreference = (id) => {
    axios.post('http://localhost:2003/preference/set/' + id, {}, {withCredentials: true});
    console.log(id);
    window.location.reload();
}

export default function PreferenceCard(props) {

    return (
        <ButtonBase 
            onClick={() => changePreference(props.id)}
            sx={{
                // m: 1000,
                // p: 1000,
                // width: 1000,
                // height: 1000,
            }}
        >
            <Card 
            class={"box " + props?.class}
            title={props.title}
            body={props.body}
            img={props.img}
            id={props.id}
            onClick={() => changePreference(props.id)}
            >    
            </Card> 
        </ButtonBase>
    );
}