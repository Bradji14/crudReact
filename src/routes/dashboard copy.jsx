import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import DialogReg from "./dialog";
import Swal from "sweetalert2";
import "../App.css";

const Dashboard = ({ user, setUser }) => {

  const [products, setProducts] = useState([]);

  const getData = async () => {
    await axios.get("http://localhost:3001/getproducts").then((response) => {
      const allData = response.data;
      setProducts(allData);
    });
  };
  const updateProduct = (productID) => {
    console.log(productID);
  };
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

  const dialog=()=>{
    DialogReg()
    getData();
  }

  const optionsT = {
    selectableRows: 'none',
    customToolbar: () => {
      return (
        <Button variant="contained" color="primary" onClick={dialog}>Add new product</Button>
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
      label: "name",
    },
    {
      name: "description",
      label: "description",
    },
    {
      name: "price",
      label: "price",
    },
    {
      name: "id",
      label: "Options",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => updateProduct(value)}
              >
                Editar
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteProduct(value)}
              >
                Eliminar
              </Button>
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
        <Button variant="contained">Logout</Button>
   
      </div>
      <MUIDataTable
        title="List of products"
        data={products}
        columns={columns}
        options={optionsT}
      />
    </>
  );
};
export default Dashboard;
