import { store } from "../store";

import { fetchApplicants } from "./thunks/fetchApplicants";
import { fetchMyListingsAsync } from "./thunks/fetchMyListings";
import { uploadListingsAsync } from "./thunks/uploadListings";

const MY_LISTINGS = function (data) {
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

MY_LISTINGS.fetchMyListings = (userId) => {
  store.dispatch(fetchMyListingsAsync(userId));
};

MY_LISTINGS.fetchApplicants = (applicantIds) => {
  store.dispatch(fetchApplicants(applicantIds));
};

MY_LISTINGS.uploadListing = (listing) => {
  console.log("Upload listing dispatch", listing);
  store.dispatch(uploadListingsAsync(listing));
};

export { MY_LISTINGS };
