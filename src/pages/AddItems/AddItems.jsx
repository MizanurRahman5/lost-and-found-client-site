import React from "react";
import AddPost from "../../component/AddPost";
import { Helmet } from "react-helmet";

const AddItems = () => {
  return (
    <div>
      <Helmet>
        <title>Add Lost and Found</title> {/* Dynamic title */}
      </Helmet>
      <AddPost />
    </div>
  );
};

export default AddItems;
