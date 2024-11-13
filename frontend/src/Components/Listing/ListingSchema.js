import {
  addDoc,
  collection,
  getDocs,
  where,
  orderBy,
  query,
  startAfter,
  getDoc,
  doc,
  getCountFromServer,
  limit,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase";

const listingCollection = collection(db, "listing");

const Listing = function (data) {
  this.title = data.title;
  this.description = data.description;
  this.category = data.position;
  this.type = data.primaryRole;
  this.payType = data.payType;
  this.createdBy = data.createdBy;
  this.skills = data.skills;
  this.whatsapp = data.whatsapp;
  this.recruting_email = data.recruting_email;
  this.listing_email = data.listing_email;
  this.applicants = data.applicants;
  this.createdAt = data.createdAt;
  this.minStipend = data.minStipend;
  this.maxStipend = data.maxStipend;
  this.minEquity = data.minEquity;
  this.maxEquity = data.maxEquity;
  this.minPartnership = data.minPartnership;
  this.maxPartnership = data.maxPartnership;
  this.easy_apply = data.easy_apply;
  this.apply_link = data.apply_link;
  this.userName = data.userName;
  this.userImg = data.userImg;
};

Listing.getAll = function () {
  return new Promise(async (resolve, reject) => {
    try {
      const snapshot = await getDocs(listingCollection);
      const listings = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      resolve(listings);
    } catch (error) {
      reject(error);
    }
  });
};

Listing.addListing = function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const newListing = {
        title: data.title,
        description: data.description,
        category: data.position,
        type: data.primaryRole,
        payType: data.payType,
        createdBy: data.createdBy,
        skills: data.skills,
        applicants: data.applicants || [],
        createdAt: data.createdAt,
        minStipend: data.minStipend,
        maxStipend: data.maxStipend,
        minEquity: data.minEquity,
        maxEquity: data.maxEquity,
        minPartnership: data.minPartnership,
        maxPartnership: data.maxPartnership,
        email: data.listing_email,
        methods: {
          easy_apply: data.easy_apply,
          email: data.recruting_email,
          link: data.apply_link,
          whatsapp: data.whatsapp,
        },
      };
      console.log(newListing);
      const docRef = await addDoc(
        listingCollection,
        JSON.parse(JSON.stringify(newListing))
      );
      resolve(docRef);
    } catch (error) {
      reject(error);
    }
  });
};

Listing.getByEmail = async function (email, pageLimit, previousRecord) {
  try {
    let countQuery = null;

    if (!previousRecord) {
      countQuery = query(
        listingCollection,
        where("email", "==", email),
        orderBy("createdAt", "desc")
      );
    } else {
      countQuery = query(
        listingCollection,
        where("email", "==", email),
        orderBy("createdAt", "desc"),
        startAfter(previousRecord["createdAt"])
      );
    }

    const records = await getCountFromServer(countQuery);

    const hasNext = records.data().count > pageLimit;

    let fetchQuery = null;

    if (!previousRecord) {
      fetchQuery = query(
        listingCollection,
        where("email", "==", email),
        orderBy("createdAt", "desc"),
        limit(pageLimit)
      );
    } else {
      fetchQuery = query(
        listingCollection,
        where("email", "==", email),
        orderBy("createdAt", "desc"),
        limit(pageLimit),
        startAfter(previousRecord["createdAt"])
      );
    }

    const snapshot = await getDocs(fetchQuery);
    const listings = [];
    snapshot.docs.forEach((doc) => listings.push(doc.data()));
    return { listings, hasNext };
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

Listing.getApplicants = async function (applicantEmails) {
  try {
    const applicants = [];

    for (const applicantEmail of applicantEmails) {
      const userRef = doc(db, "users", applicantEmail);
      const user = await getDoc(userRef);
      applicants.push({ email: applicantEmail, ...user.data() });
    }

    return applicants;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export default Listing;
