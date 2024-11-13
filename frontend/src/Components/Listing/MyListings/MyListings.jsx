import { useSelector } from "react-redux";
import Listing from "./Listing";
import { useEffect } from "react";
import { MY_LISTINGS } from "../../../store/MYLISTINGS_STORE/myListingsActions";
import {
  selectAllMyListings,
  selectMyListingInfo,
} from "../../../store/MYLISTINGS_STORE/myListingsSlice";
import useFirebase from "../../../hooks/useFirebase";
import { Button } from "flowbite-react";

const MyListings = () => {
  const { user } = useFirebase();
  const listings = useSelector((state) =>
    selectAllMyListings(state.myListingsData.listings)
  );
  const { isLoading, hasNext } = useSelector((state) =>
    selectMyListingInfo(state.myListingsData.listings)
  );

  useEffect(() => {
    MY_LISTINGS.fetchMyListings(user.email);
  }, []);

  return (
    <div className="p-5 lg:max-w-[70%] md:max-w-[80%] sm:max-w-[90%] max-w-[100%] mx-auto">
      {listings.length > 0 &&
        listings?.map((listing) => <Listing post={listing} key={listing.id} />)}
      {listings?.length === 0 && (
        <h1 className="text-xl text-gray-700 text-center mt-5 font-bold">
          Oops! you don't have any listing. Create one
          <a
            href="/listing/list"
            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 ml-2"
          >
            here
          </a>
        </h1>
      )}
      {hasNext && (
        <Button
          size={"sm"}
          className="mx-auto my-3"
          onClick={() => MY_LISTINGS.fetchMyListings(user.email)}
          isProcessing={isLoading}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default MyListings;
