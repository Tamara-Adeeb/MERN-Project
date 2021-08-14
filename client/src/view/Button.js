import axios from 'axios'
import React from 'react'

const Button = ({color,id,technologyId,title,onSelect}) => {

    const styleButton = {
        color: color,
        fontSize: "1em",
        margin: "1em",
        padding: "0.25em 1em",
        border: "2px solid "+color,
        borderRadius: "3px"
    }

    const AddTochnology = () => {
        // console.log(technologyId)
        //     console.log(id)
        // title !== "Follow"?
        // axios.put(`/api/updateUser/${id}/${{technologyId}}`)
        // .then(res => console.log(res))
        // .catch(err => console.log(err.message))
        // :console.log(id)

        if(title !== "UnFollow"){
            console.log(technologyId)
            console.log(id)
            axios.put(`http://localhost:8000/api/updateUser/${id}/${technologyId}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
        else if (title !== "Follow"){
            console.log("dgdfgfgf")
            axios.put(`http://localhost:8000/api/updateUserUnFoll/${id}/${technologyId}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
        onSelect(true)
    }
    return (
        <div>
            <button style={styleButton}  onClick={AddTochnology}>{title}</button>
        </div>
    )
}

export default Button
