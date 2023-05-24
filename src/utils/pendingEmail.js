import emailjs from "@emailjs/browser";
import { message } from "antd";


const sendPendingEmail=( to_email,
  invoice_no,
  invoice_date,
  check_no,
  team_name,
  team_count,
  accomodation_count,
  accomodation_amount,
  competition,
  paid_amount,
  total_amount ) => {
  // to_name ------> Team name
  // to_email -----> Team lead email
  emailjs
    .send(
      'service_rv9090c',
      'template_nx3ap04',
      {
        to_email,
        invoice_no,
        invoice_date,
        check_no,
        team_name,
        team_count,
        accomodation_count,
        accomodation_amount,
        competition,
        paid_amount,
        total_amount
      },
      'ylFbuYIhL6NREqKkG'
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