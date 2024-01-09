import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import 'animate.css'
import Swal from "sweetalert2";
// import { useLocalStorage } from "react-use";
import "../App.css";

const Dashboard = ({ user, setUser }) => {
  const [products, setProducts] = useState([]);

  
  const handleLogout = () => {
  
    setUser(null);
    // localStorage.removeItem("user")
    // navigate("/")    
  };
  // function getdata for all products
  const getData = async () => {
    await axios.get("http://localhost:3001/getproducts").then((response) => {
      const allData = response.data;
      setProducts(allData);
    });
  };
  // function for update products
  const updateProduct = (productID, metaData) => {
    console.log(metaData.rowData[2]);
    return Swal.fire({
      title: "Updating data...",
      icon: "warning",
      html: `<div class="formAdd">
        <input id="swal-input1" class="swal2-input" type="text" value="${metaData.rowData[1]}">
        <input id="swal-input2" class="swal2-input" type="text" value="${metaData.rowData[2]}">
        <input id="swal-input3" class="swal2-input" type="text" value="${metaData.rowData[3]}">
        </div>`,
      focusConfirm: false,
      confirmButtonText: "Update product",
      preConfirm: () => {
        const name = document.getElementById("swal-input1").value;
        const description = document.getElementById("swal-input2").value;
        const price = document.getElementById("swal-input3").value;

        return {
          name: name,
          description: description,
          price: price,
          id: productID,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { name, description, price, id } = result.value;
        axios
          .put("http://localhost:3001/updateproducts", {
            id: id,
            name: name,
            description: description,
            price: price,
          })
          .then((r) => {
            setTimeout(() => {
              Swal.fire({
                title: "Product update successfully",
                icon: "success",
              });

              getData();
            }, 1000);
          });
      }
    });
  };

  // function delete product
  const deleteProduct = (productID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:3001/deleteproducts", {
            data: {
              id: productID,
            },
          })
          .then((r) => {
            if (r) {
              Swal.fire({
                title: "Deleted!",
                text: "Product has been deleted.",
                icon: "success",
              });
            }
            getData();
          });
      }
    });
  };

  // dialog on open on eject function optionsT
  const dialog = () => {
    return Swal.fire({
      title: "Add new's products",
      html:
        '<div class="formAdd">' +
        '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Description">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Price" type="number">' +
        "</div>",
      focusConfirm: false,

      preConfirm: () => {
        const name = document.getElementById("swal-input1").value;
        const description = document.getElementById("swal-input2").value;
        const price = document.getElementById("swal-input3").value;
        if (!name || !description || !price) {
          Swal.showValidationMessage("Please complete all fields ");
        }
        return { name: name, description: description, price: price };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { name, description, price } = result.value;
        axios
          .post("http://localhost:3001/addproducts", {
            name: name,
            description: description,
            price: price,
          })
          .then((r) => {
            Swal.fire({
              title: "Product add successfully",
              icon: "success",
            });

            getData();
          });
      }
    });
  };

  // options for data react, this open the dialog for add product(function dialog)
  const optionsT = {
    selectableRows: "none",
    customToolbar: () => {
      return (
        <Button variant="contained" color="primary" onClick={dialog}>
          Add new product
        </Button>
      );
    },
  };

  useEffect(() => {
    
      getData();
    
  }, []);

  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "name",
      label: "NAME PRODUCT",
    },
    {
      name: "description",
      label: "DESCRIPTION",
    },
    {
      name: "price",
      label: "PRICE",
    },
    {
      name: "id",
      label: "OPTIONS",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <section className="options">
                <div className="">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "white", border: "none" }}
                    onClick={() => updateProduct(value, tableMeta)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      viewBox="0 0 512 512"
                      fill="green"
                    >
                      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                    </svg>
                  </Button>
                </div>

                <div>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "white", border: "none" }}
                    onClick={() => deleteProduct(value)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="14"
                      viewBox="0 0 448 512"
                      fill="red"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </Button>
                </div>
              </section>
            </>
          );
        },
      },
    },
  ];

  return (
    <>
      <div className="containerDash">
        <div className="svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="25"
            viewBox="0 0 448 512"
          >
            <path d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z" />
          </svg>
          <span>{user}</span>
        </div>
        <Button variant="contained" onClick={handleLogout}>Logout</Button>

      </div>
      <MUIDataTable
        title="List of products"
        data={products}
        columns={columns}
        options={optionsT}
        className="animate__animated animate__backInLeft"
      />
    </>
  );
};
export default Dashboard;
