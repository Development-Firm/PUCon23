import emailjs from "@emailjs/browser";
import { message } from "antd";


const sendApprovalEmail=( to_email, team, team_lead ) => {
  // to_name ------> Team name
  // to_email -----> Team lead email
  // event -----> event
  emailjs
    .send(
      'service_rv9090c',
      'template_09oeggf',
      {
        to_email,
        team,
        team_lead
      },
      'ylFbuYIhL6NREqKkG'
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