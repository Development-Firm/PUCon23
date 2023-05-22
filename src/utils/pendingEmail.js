import emailjs from "@emailjs/browser";
import { message } from "antd";


const sendPendingEmail=( to_email, to_name ) => {
  // to_name ------> Team name
  // to_email -----> Team lead email
  emailjs
    .send(
      'service_gmg06wv',
      'template_c7wdfce',
      {
        to_name,
        to_email,
      },
      'W9tc9Lc4BB8qAK4qt'
    )
    .then(
      () => {
        message.success( 'We have recieved your registration request! Check your email for further information', 8 )
      },
      ( error ) => {
        message.error( "Ahh, something went wrong. Please try again.", 6 )
      }
    );
}
export default sendPendingEmail;