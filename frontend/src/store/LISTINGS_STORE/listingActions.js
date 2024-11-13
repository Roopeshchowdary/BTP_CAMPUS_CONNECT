import { store } from "../store";
import {
  removeListing,
  appendListing,
  removeAllListings,
} from "./listingSlice";

import { fetchListingsAsync } from "./thunks/fetchListings";

const LISTINGS = function (data) {
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

LISTINGS.fetchListings = () => {
  if (store.getState().listingsData.ids.length > 1) return;
  store.dispatch(fetchListingsAsync());
};

LISTINGS.appendListing = (data) => {
  store.dispatch(appendListing(data));
};

LISTINGS.removeListing = (id) => {
  store.dispatch(removeListing(id));
};

LISTINGS.removeAllListings = () => {
  store.dispatch(removeAllListings());
};

export { LISTINGS };
