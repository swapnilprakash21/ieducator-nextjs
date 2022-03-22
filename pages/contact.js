import Head from 'next/head'
import { withRouter } from 'next/router';
import React, { Component } from 'react'
import styles from '../styles/Contact.module.css'
import Script from 'next/script'
import ReCAPTCHA from "react-google-recaptcha";
import { SpinnerCircularFixed } from 'spinners-react';

export default withRouter(class Contact extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            phone: "",
            message: "",
            formError: false,
            formSuccess: false,
            errorMessage: "",
            successMessage: "",
            formProcessing: false
        }
        this.recaptchaRef = React.createRef();
    }

    handleSubmit = async (e) => {
        this.setState(
            {
                formProcessing: true,
                formError: false,
                formSuccess: false,
                errorMessage: "",
                successMessage: "",
            });
        e.preventDefault();
        let body = {
            "name": this.state.name,
            "email": this.state.email,
            "phone": this.state.phone,
            "message": this.state.message,
            "captcha": this.state.captchaCode
        };
        try {
            let post = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/postContact`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',

                },
                body: JSON.stringify(body),
            });
            let res = await post.json();
            if (post.status === 400 || post.status === 500) {

                this.setState({ formSuccess: false, formError: true, errorMessage: res.error })
            }
            else if (post.status === 200) {

                this.setState({ formError: false, formSuccess: true, successMessage: res.success, name: "", email: "", phone: "", message: "", })
            }
        } catch (error) {
            this.setState({ formSuccess: false, formError: true, errorMessage: "Something went wrong. Please try again." })
        }

        this.props.router.push({ pathname: '/contact', state: { pattern: this.state.formSubmitted } }, undefined, { shallow: true, scroll: true })
        this.recaptchaRef.current.reset();
        this.setState({ captchaCode: undefined })
        this.setState({ formProcessing: false });
    }

    onReCAPTCHAChange = (captchaCode) => {
        if (!captchaCode) {
            this.recaptchaRef.current.reset();
            this.setState({ captchaCode: undefined })
        }
        else {
            this.setState({ captchaCode: captchaCode })
        }
    }

    handleChange = (e) => {
        if (e.target.name == 'phone') {
            this.setState({ phone: e.target.value })
        }
        else if (e.target.name == 'email') {
            this.setState({ email: e.target.value })
        }
        else if (e.target.name == 'message') {
            this.setState({ message: e.target.value })
        }
        else if (e.target.name == 'name') {
            this.setState({ name: e.target.value })
        }
    }

    render() {
        return (
            <>
                <Head>
                    <title>Contact us - iEducator</title>
                </Head>
                <div className={styles.main}>
                    <div className={styles.contactForm}>
                        {
                            this.state.formError &&
                            <div className={styles.alertDanger}>
                                <i className="fas fa-exclamation-triangle    "></i>
                                <p>{this.state.errorMessage}</p>
                            </div>
                        }
                        {
                            this.state.formSuccess &&
                            <div className={styles.alertSuccess}>
                                <strong><i className="fas fa-check-circle    "></i> Success:</strong>
                                <p>{this.state.successMessage}</p>
                            </div>
                        }
                        <div className={styles.contactBox}>
                            <div className={styles.left}>
                                <h1 style={{ 'fontSize': "3rem" }}>Contact Us</h1>
                                <div className={styles.contactDesc}>
                                    <img src="/img/contact-us.avif" alt="Contact us" className={styles.contactImg} />
                                    <h2>Let&apos;s talk about everything!</h2>
                                    <p>
                                        Have doubt or suggestion to make? Feel free to ask us anything. If you have any suggestions, please
                                        let
                                        me know. Your suggestions are highly appreciated. I appreciate your time and try hard to reply
                                        to
                                        every single message posted here! Keep dropping your priceless opinions.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <form action="" method='post' autoComplete="off" onSubmit={this.handleSubmit}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name">Enter your Name:</label>
                                        <input type="text" name="name" id="name" className={styles.formInput} placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="email">Enter your Email Address:</label>
                                        <input type="text" name="email" id="email" className={styles.formInput} placeholder="someone@example.com" value={this.state.email} onChange={this.handleChange} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="phone">Enter your Phone Number:</label>
                                        <input type="text" name="phone" id="phone" className={styles.formInput} placeholder="Phone Number" value={this.state.phone} onChange={this.handleChange} minLength={10} maxLength={10} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="message">Elaborate your concern:</label>
                                        <textarea name="message" id="message" className={styles.formInput} rows="6" cols="50"
                                            placeholder="Message" value={this.state.message} onChange={this.handleChange}></textarea>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <ReCAPTCHA ref={this.recaptchaRef} sitekey="6LcDwPYeAAAAANN_FohcAJ13Fu7e6wrGIm_PgXXQ" onChange={this.onReCAPTCHAChange}></ReCAPTCHA>
                                    </div>

                                    <button type="submit" className={styles.submitBtn} disabled={this.state.formProcessing}>{
                                        this.state.formProcessing ? <span>PLEASE WAIT... <SpinnerCircularFixed size={16} speed={200} color={"#fff"} thickness={200} /></span> : <span>SEND MESSAGE</span>}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
})
