import emailjs from "@emailjs/browser";
import { message } from "antd";


const sendApprovalEmail=( to_email, to_name, event, team ) => {
  // to_name ------> Team name
  // to_email -----> Team lead email
  // event -----> event
  emailjs
    .send(
      'service_j6o8fho',
      'template_6twl2e1',
      {
        to_name,
        to_email,
        event,
        team
      },
      '0eWoErcR7SUWIv7XC'
    )
    .then(
      () => {
        message.success( 'Approval Email has been sent to respective team!.' )
      },
      ( error ) => {
        message.error( "Ahh, something went wrong. Please try again." )
      }
    );
}
export default sendApprovalEmail;