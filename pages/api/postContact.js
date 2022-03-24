var emailValidator = require("email-validator");

export default async function postContact(req, res) {
    if (req.method === 'POST') {
        // Destructuring the required params from req.body
        let { name, email, phone, message, captcha } = req.body;


        // Validating captcha
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


        // Validating user's request
        if (captcha === undefined) {
            res.status(400).json({ error: "Invalid Captcha" });
        }
        else if (name.trim() === '') {
            res.status(400).json({ error: "Please enter your name" });
        }
        else if (name.trim().length < 3) {
            res.status(400).json({ error: "Your name must be at least 3 characters." });
        }
        else if (name.trim().length > 50) {
            res.status(400).json({ error: "Your name cannot be more than 50 characters." });
        }
        else if (email.trim() === '') {
            res.status(400).json({ error: "Please enter your email" });
        }
        else if (email.trim().length < 15) {
            res.status(400).json({ error: "Your email must be at least 15 characters." });
        }
        else if (!emailValidator.validate(email)) {
            res.status(400).json({ error: "Please enter a valid email address" });
        }
        else if (phone.trim() === '') {
            res.status(400).json({ error: "Please enter your phone number" });
        }
        else if (phone.trim().length > 10 || phone.trim().length < 10 || isNaN(phone.trim())) {
            res.status(400).json({ error: "Please enter a valid phone number" });
        }
        else if (message.trim() === '') {
            res.status(400).json({ error: "Please enter your message" });
        }
        else if (message.trim().length < 30) {
            res.status(400).json({ error: "Your message must have at least 30 characters." });
        }
        else if (message.trim().length > 1000) {
            res.status(400).json({ error: "Your message cannot be more than 1000 characters." });
        }
        else {
            // Everything looks good, so create an entry in the database


            // Fetching the secret api key from the environment variable
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
                // Sending a post request to strapi api
                fetch('https://ieducator-api-strapi-sp.herokuapp.com/api/contacts', {
                    method: "post",
                    headers: {
                        'Content-type': 'application/json',
                        "Authorization": `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify(body),
                }).then((response) => {
                    if (response.status === 200) {
                        // If the entry has been created, then send a success message as response
                        res.status(200).json({ success: "Thank you for contacting us." })
                    }
                    else {
                        // If there are issues with the server or the api is unable to handle the request, then show an internal server error message
                        res.status(500).json({ error: "Internal Server Error" })
                    }
                })

            } catch (error) {
                // If there are issues with the server or the api is unable to handle the request, then show an internal server error message
                res.status(500).json({ error: "Internal Server Error" })
            }
        }
    }
    else {
        res.status(404).json({ error: "404 Not Found" });
    }
}