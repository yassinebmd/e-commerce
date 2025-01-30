import { 
    Container, 
    Button, 
    Typography, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    CircularProgress,
    Alert,
    Avatar
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import { UseAuth } from "../context/auth/authContext";
  import { useEffect, useState } from "react";
  
  const MyordersPage = () => {
      const navigate = useNavigate();
      const { getMyOrders, myorders } = UseAuth();
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
  
      useEffect(() => {
          const fetchData = async () => {
              try {
                  await getMyOrders();
                  setError(null);
              } catch (err) {
                  setError("Failed to load orders");
              } finally {
                  setLoading(false);
              }
          };
          fetchData();
      }, [getMyOrders]);
  
      return (
          <Container
              maxWidth="md"
              sx={{
                  mt: 4,
                  mb: 4,
                  minHeight: "80vh",
                  display: "flex",
                  flexDirection: "column"
              }}
          >
              <Typography variant="h4" component="h1" gutterBottom>
                  My Orders
              </Typography>
  
              {loading ? (
                  <CircularProgress sx={{ mx: "auto" }} />
              ) : error ? (
                  <Alert severity="error">{error}</Alert>
              ) : (
                  <TableContainer component={Paper}>
                      <Table>
                          <TableHead sx={{ bgcolor: "background.default" }}>
                              <TableRow>
                                  <TableCell>Order ID</TableCell>
                                  <TableCell>Items</TableCell>
                                  <TableCell>Address</TableCell>
                                  <TableCell align="right">Total</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {(myorders || []).map((order) => (
                                  <TableRow key={order?._id || Math.random()}>
                                      <TableCell>
                                          #{order?._id?.slice(-6)?.toUpperCase() || "N/A"}
                                      </TableCell>
                                      <TableCell>
                                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                                              {order?.orderItems?.map((item, index) => (
                                                  <div key={item?._id || index} style={{ display: 'flex', alignItems: 'center', margin: '4px 0' }}>
                                                      <Avatar 
                                                          src={item?.productImage} 
                                                          alt={item?.productTitle}
                                                          sx={{ width: 40, height: 40, mr: 2 }}
                                                      />
                                                      <div>
                                                          <Typography variant="body2">
                                                              {item?.productTitle || "Unknown Product"}
                                                          </Typography>
                                                          <Typography variant="caption">
                                                              Qty: {item?.quantité || 0} × ${item?.unitprice?.toFixed(2) || 0.00}
                                                          </Typography>
                                                      </div>
                                                  </div>
                                              ))}
                                          </div>
                                      </TableCell>
                                      <TableCell>
                                          {order?.adress || "No address provided"}
                                      </TableCell>
                                      <TableCell align="right">
                                          <Typography variant="body1" fontWeight="bold">
                                              ${order?.total?.toFixed(2) || "0.00"}
                                          </Typography>
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                      
                      {(!loading && myorders?.length === 0) && (
                          <Typography sx={{ p: 3, textAlign: "center" }}>
                              No orders found
                          </Typography>
                      )}
                  </TableContainer>
              )}
  
              <Button
                  variant="contained"
                  sx={{ mt: 3, alignSelf: "flex-start" }}
                  onClick={() => navigate("/")}
              >
                  GO TO HOME
              </Button>
          </Container>
      );
  };
  
  export default MyordersPage;