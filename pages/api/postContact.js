var emailValidator = require("email-validator");

export default async function postContact(req, res) {
    if (req.method === 'POST') {
        let { name, email, phone, message, captcha } = req.body;
        if (captcha !== undefined) {
            try {
                let data = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                    },
                    method: "POST",
                });
                let response = await data.json();
                if (response.success !== true) {
                    res.status(400).json({ error: "Invalid Captcha" });
                    return;
                }
            } catch (error) {

            }
        }

        if (captcha === undefined) {
            res.status(400).json({ error: "Invalid Captcha" });
        }
        else if (name.trim() === '') {
            res.status(400).json({ error: "Please enter your name" });
        }
        else if (email.trim() === '') {
            res.status(400).json({ error: "Please enter your email" });
        }
        else if (!emailValidator.validate(email)) {
            res.status(400).json({ error: "Please enter a valid email address" });
        }
        else if (phone.trim() === '') {
            res.status(400).json({ error: "Please enter your phone number" });
        }
        else if (message.trim() === '') {
            res.status(400).json({ error: "Please enter your message" });
        }
        else {
            let apiKey = process.env.API_KEY;
            let body = {
                "data": {
                    "name": name,
                    "email": email,
                    "phone": phone,
                    "message": message
                }
            };
            try {
                fetch('https://ieducator-api-strapi-sp.herokuapp.com/api/contacts', {
                    method: "post",
                    headers: {
                        'Content-type': 'application/json',
                        "Authorization": `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify(body),
                }).then((response) => {
                    if (response.status === 200) {
                        res.status(200).json({ success: "Thank you for contacting us." })
                    }
                    else {
                        res.status(500).json({ error: "Internal Server Error" })
                    }
                })

            } catch (error) {
                console.log(error)
                res.status(500).json({ error: "Internal Server Error" })
            }
        }
    }
    else {
        res.status(404).json({ error: "404 Not Found" });
    }
}