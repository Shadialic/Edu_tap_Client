import React, { useEffect, useState } from "react";
import Sidebar from "../../components/AdminComponents/Layouts/Sidebar";
import Navbar from "../../components/AdminComponents/Layouts/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { ManageCategory, loadCategory, manageBlock } from "../../api/AdminApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

function Category() {
  const [CategoryName, setCategoryName] = useState("");
  const [category, setCategory] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await loadCategory();
        const newData = response.data.data;
        setCategory(newData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategoryData();
  }, []);

  const handleBlockCategory = async (id) => {
    const response = await manageBlock(id);
    toast(response.data.alert);
    setCategory((prevCategory) =>
      prevCategory.map((item) =>
        item._id === id ? { ...item, is_Block: true } : item
      )
    );
    // Save the updated state to local storage
    localStorage.setItem(`blockStatus_${id}`, "true");
  };

  const handleUnBlockCategory = async (id) => {
    const response = await manageBlock(id);
    toast(response.data.alert);
    setCategory((prevCategory) =>
      prevCategory.map((item) =>
        item._id === id ? { ...item, is_Block: false } : item
      )
    );
    // Save the updated state to local storage
    localStorage.setItem(`blockStatus_${id}`, "false");
  };

  const fetchCategoryData = async () => {
    try {
      const response = await loadCategory();
      const newData = response.data.data;
      setCategory(newData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (CategoryName === "") {
        toast("Enter category");
      } else {
        setOpen(false);
        const data = { categoryname: CategoryName };
        const response = await ManageCategory(data);
        toast(response.data.alert);
        fetchCategoryData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const retrieveBlockStatus = (id) => {
    const status = localStorage.getItem(`blockStatus_${id}`);
    return status === "true";
  };

  const filteredData = category.filter((categoryItem) => {
    const searchLowerCase = searchInput.toLowerCase();
    return categoryItem.categoryName.toLowerCase().includes(searchLowerCase);
  });

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <Sidebar state={"Category"} />
      <Navbar
        state={"Category"}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <Link to={`/vendor/${category}`}></Link>
      <div className="flex items-end justify-end mr-14">
        <Button onClick={() => setOpen((cur) => !cur)}>ADD+</Button>
        <Dialog
          size="xs"
          open={open}
          handler={() => setOpen((cur) => !cur)}
          className="bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <form onSubmit={handleSubmit}>
                <Typography variant="h6">Enter New Category</Typography>
                <Input
                  label="Category"
                  size="lg"
                  onChange={(e) => setCategoryName(e.target.value)}
                  value={CategoryName}
                />
                <CardFooter className="pt-0 mt-5">
                  <Button
                    className="bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20 "
                    variant="gradient"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                </CardFooter>
              </form>
            </CardBody>
          </Card>
        </Dialog>
      </div>
      <div className="mt-12 mb-8 flex flex-col gap-12 p-4 xl:ml-80">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20 shadow-lg -mt-6 mb-8 p-6">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
              Categories
            </h6>
          </div>
          <div className="p-4 overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-40 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                      Id
                    </p>
                  </th>
                  <th className="border-b border-blue-gray-40 py-3 px-2 text-center">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                      Category
                    </p>
                  </th>
                  <th className="border-b border-blue-gray-40 py-3 px-2 text-rigth">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                      Status
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((values, index) => (
                  <tr key={values._id}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">{index + 1}</div>
                    </td>
                    <td className="py-3 px-8 border-b border-blue-gray-50">
                      {" "}
                      {/* Increased right padding for categoryName */}
                      <div className="flex items-center justify-center gap-4 ">
                        {values.categoryName}
                      </div>
                    </td>
                    <td className="py-3 px-3 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4  justify-around">
                        {!retrieveBlockStatus(values._id) ? (
                          <button
                            className="relative grid items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20 rounded-lg py-0.5 px-2 text-[11px] font-medium w-auto"
                            data-projection-id="1"
                            style={{ opacity: 1 }}
                            onClick={() => handleBlockCategory(values._id)}
                          >
                            <span>Block</span>
                          </button>
                        ) : (
                          <button
                            className="relative grid items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20 rounded-lg py-0.5 px-2 text-[11px] font-medium w-auto"
                            data-projection-id="1"
                            style={{ opacity: 1 }}
                            onClick={() => handleUnBlockCategory(values._id)}
                          >
                            <span>Unblock</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <ReactPaginate
                previousLabel={
                  <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
                }
                nextLabel={
                  <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
                }
                breakLabel={"..."}
                pageCount={Math.ceil(filteredData.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(data) => setCurrentPage(data.selected)}
                containerClassName={"pagination flex gap-2"}
                activeClassName={
                  "bg-white-500 text-lightBlue-900 px-3 py-2 rounded"
                }
                previousClassName={
                  "border bg-[#075985] text-white rounded px-3 py-2 hover:bg-lightBlue-950"
                }
                nextClassName={
                  "border bg-[#075985] text-white rounded px-3 py-2 hover:bg-lightBlue-950"
                }
                disabledClassName={"opacity-110"}
              />
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
