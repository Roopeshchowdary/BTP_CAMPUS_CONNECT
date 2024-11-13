import { whatsappMessage } from "../config.json";

export default function getWhatsappLink(whatsapp) {
  if (!whatsapp || !whatsapp.contact) {
    return "";
  }

  let whatsappLink = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
    whatsapp.contact
  )}`;

  whatsappLink += `&text=${encodeURIComponent(whatsappMessage)}`;

  return whatsappLink;
}
