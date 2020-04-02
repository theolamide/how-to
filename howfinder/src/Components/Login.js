import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import { Div1, SignUpDiv, LabelDiv, FieldInfo, GetStarted, FormikForm } from './SignUp';
import * as Yup from 'yup';
import axios from 'axios';
import Styled from 'styled-components';

const LogInto = Styled.button`
    color: #fff !important;
    text-transform: uppercase;
    text-decoration: none;
    background: #553555;
    padding: 15px;
    border-radius: 5px;
    display: inline-block;
    border: none;
    transition: all 0.4s ease 0s;
    margin: 20px;
    width: 25%;
    cursor: pointer;
        &:hover{
            background-color: #B289B2;
            box-shadow: 10px 5px 5px #553555;
        }
`



const LogIn = ({ values, errors, touched, status }, props) => {
    const [LogForm, setLogForm] = useState([]);


    useEffect(() => {
        status && setLogForm(LogForm =>
            [...LogForm, status]);
    }, [status]);
    return (
        <Div1 className="FormField">
            <GetStarted>Sign In</GetStarted>
            <FormikForm>
                <SignUpDiv>
                    <LabelDiv>
                        <FieldInfo
                            type='text'
                            name='username'
                            placeholder='username'
                        />
                        {touched.username && errors.username && (
                            <p classname="errors">{errors.username}</p>
                        )}
                    </LabelDiv>

                    <LabelDiv>
                        <FieldInfo
                            type='password'
                            name='password'
                            placeholder='password'
                        />

                        {touched.password && errors.password &&
                            (<p classname='errors'> {errors.password}</p>
                            )}
                    </LabelDiv>

                    <LabelDiv>
                        <LogInto type="submit">SIGN IN</LogInto>
                    </LabelDiv>
                </SignUpDiv>
            </FormikForm>
        </Div1>
    )


}

const LogInForms = withFormik({
    mapPropsToValues({ username, password }) {
        return {
            username: username || "",
            password: password || "",

        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required()
    }),

    handleSubmit(values, { props, setStatus }) {
        axios
            .post("https://build-week-how-to.herokuapp.com/api/auth/login", values)
            .then(res => {
                setStatus(res.data);
                console.log(res);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user_id", res.data.user_id);
                props.history.push('/add-how-to')
            })
            .catch(err => console.log(err.response));
    }
})(LogIn);

export default LogInForms;
