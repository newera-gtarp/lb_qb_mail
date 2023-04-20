import { Email, Mail } from "../types/mail";

export const MockMail: Mail[] = [
  {
    mailid: 2,
    sender: "Eduardo",
    subject: "Delivery Location",
    message:
      "Here is all info about the delivery, <br><br>Items: <br> 1x Weed Brick<br><br> Be on time!!",
    read: 0,
    date: 1660745412000,
    button: {
      buttonEvent: "qb-drugs:client:setLocation",
      enabled: true,
      buttonData: {
        dealer: "Eduardo",
        itemData: {
          minrep: 0,
          item: "weed_brick",
        },
        amount: 2,
        locationLabel: "DR Kush",
        coords: {
          x: -1151.9300537109375,
          y: -1447.5899658203125,
          z: 4.71000003814697,
        },
      },
    },
  },
  {
    mailid: 1,
    sender: "Billing Department",
    subject: "Invoice Paid",
    message: "Invoice Has Been Paid From Sienna Dunlap In The Amount Of $425",
    read: 1,
    date: 1660653186000.0,
  },
];

const oldDate = new Date();
oldDate.setHours(oldDate.getHours() - 1);

export const MockEmails: Email[] = [
  {
    id: 123,
    citizenid: "1234",
    created_at: new Date(),
    message:
      "Hi Chuck,<br>I am inquiring about your craigslist posting about eating ass. I love ass and further, I love eating it. Therefore I happily offer to eat your ass. Please have a <i>Chipotle</i> meal no later than 5 hours prior to said ass eating. Thanks! <br><br>Best,<br>Erik",
    sender: "Erik",
    subject: "RE: offer to eat ass",
  },
  {
    id: 1234,
    citizenid: "1234",
    created_at: oldDate,
    message: "emily loves <b>big</b> poopy fart. stink poop butt fart nugget",
    sender: "BurgerShot",
    subject: "New Order Request",
  },
];
