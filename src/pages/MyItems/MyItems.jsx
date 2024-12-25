import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../contex/AuthContex/AuthContex";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
import { Helmet } from 'react-helmet';

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const [lost, setLost] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/lost/${user.email}`, {
          withCredentials: true,
        })
        .then((res) => setLost(res.data))
        .catch((error) => {
          console.error("Error fetching lost items:", error);
          setError("Failed to load lost items.");
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    // SweetAlert confirmation
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/lost/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then(() => {
            setLost(lost.filter((item) => item._id !== id));
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            setError("Failed to delete item.");
            Swal.fire("Error!", "Failed to delete the item.", "error");
          });
      }
    });
  };

  return (
    <Box sx={{ padding: 4, marginTop: 8, minHeight: "600px" }}>
      <Helmet>
        <title>My Items</title>  {/* Dynamic title */}
        
      </Helmet>
      <Typography variant="h4" component="h1" gutterBottom>
        My Lost Items
      </Typography>
      
      {lost.length > 0 ? (
        <TableContainer component={Paper} sx={{ maxHeight: 400, overflowX: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date Lost</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lost.map((item) => (
                <TableRow hover key={item._id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{new Date(item.dateLost).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Link to={`/updateItems/${item._id}`}>
                      <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
                        Update
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No lost items found.</Typography>
      )}
    </Box>
  );
};

export default MyItems;
