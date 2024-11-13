import { emailBody } from "../config.json";

export default function getMailto(email) {
  if (!email || !email.ids || email.ids.length === 0) {
    return "";
  }

  let mailtoLink =
    "mailto:" + email.ids.map((id) => encodeURIComponent(id)).join(",");

  if (email.cc && email.cc.length > 0) {
    const ccList = email.cc
      .map((ccAddress) => encodeURIComponent(ccAddress))
      .join(",");
    mailtoLink += "?cc=" + ccList;
  }

  if (email.subject) {
    mailtoLink +=
      (email.cc && email.cc.length > 0 ? "&" : "?") +
      "subject=" +
      encodeURIComponent(email.subject);
  }

  mailtoLink += "&body=" + encodeURIComponent(emailBody);

  return mailtoLink;
}
