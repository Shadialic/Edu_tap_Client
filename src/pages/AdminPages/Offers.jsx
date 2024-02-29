import React, { useEffect, useState } from "react";
import Sidebar from "../../components/AdminComponents/Layouts/Sidebar";
import Navbar from "../../components/AdminComponents/Layouts/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
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
import { loadCategory, loadOffer, postOffer } from "../../api/AdminApi";

function Offers() {
  const [open, setOpen] = useState(false);
  const [categories, setCategory] = useState([]);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [formData, setFormData] = useState({
    category: "",
    percentage: "",
    startDate: "",
    expireDate: "",
    status: "",
  });
  useEffect(() => {
    const fetch = async () => {
      const response = await loadCategory();
      const categories = await loadOffer();
      console.log(categories, "categories");
      const newData = response.data.data;
      setData(categories.data.categories);
      setCategory(newData);
    };
    fetch();
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (
      !formData.category.trim() ||
      !formData.percentage.trim() ||
      !formData.startDate.trim() ||
      !formData.expireDate.trim()
    ) {
      toast.error("All fields are required!");
      return;
    }
    if (
      isNaN(formData.percentage) ||
      formData.percentage < 0 ||
      formData.percentage > 100
    ) {
      toast.error("Percentage must be a number between 0 and 100");
      return;
    }
    const startDate = new Date(formData.startDate);
    if (!startDate || startDate <= new Date()) {
      toast.error("Start date must be a valid future date");
      return;
    }
    const expireDate = new Date(formData.expireDate);
    if (!expireDate || expireDate <= startDate) {
      toast.error("Expire date must be a valid date after the start date");
      return;
    }
    const response = await postOffer(formData);
    toast.success(response.data.message);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const categoryDatas = data.filter((category) => {
    const searchLowerCase = searchInput.toLowerCase();
    const startDate = category.startDate
      .toLowerCase()
      .includes(searchLowerCase);
    return startDate;
  });

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUserDatas = categoryDatas.slice(startIndex, endIndex);
  function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }
  return (
    <div>
      <Sidebar state={"offers"} />
      <Navbar state={"offers"} />
      <div className="flex items-end justify-end mr-14">
        <Button onClick={() => setOpen((cur) => !cur)}>ADD+</Button>
        <Dialog
          size="xs"
          open={open}
          handler={() => setOpen((cur) => !cur)}
          className="bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-6 ">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <Typography variant="h6">Add New Offer</Typography>

                <select
                  className="border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                  name="category"
                  value={formData.category}
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
                <Input
                  label="Percentage"
                  size="lg"
                  onChange={handleChange}
                  name="percentage"
                  value={formData.percentage}
                />
                <Input
                  label="Start Date"
                  size="lg"
                  type="date"
                  onChange={handleChange}
                  name="startDate"
                  value={formData.startDate}
                />
                <Input
                  label="Expire Date"
                  size="lg"
                  type="date"
                  onChange={handleChange}
                  name="expireDate"
                  value={formData.expireDate}
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
          <ToastContainer />
        </Dialog>
      </div>
      <div className="mt-12 mb-8 flex flex-col gap-12 p-4 xl:ml-80">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20 shadow-lg -mt-6 mb-8 p-6">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
              Users Table
            </h6>
          </div>
          <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                      Id
                    </p>
                  </th>

                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                      Category
                    </p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                      Percentage
                    </p>
                  </th>

                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                      Start Date
                    </p>
                  </th>

                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                      Expire Date
                    </p>
                  </th>

                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                      Edit
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUserDatas.map((values,index) => (
                  <tr key={values._id}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        {index + 1}
                        {/* ... content for the second row ... */}
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        {values.category}
                        {/* ... content for the second row ... */}
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        {values.Percentage}
                        {/* ... content for the second row ... */}
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        {formatDate(values.startDate)}
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        {formatDate(values.ExpireDate)}
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50 ">
                      <div className="flex flex-row gap-3">
                        <FontAwesomeIcon icon={faPenToSquare} />
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "red" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <div className="flex justify-center mt-4">
              <ReactPaginate
                previousLabel={
                  <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
                }
                nextLabel={
                  <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
                }
                breakLabel={"..."}
                pageCount={Math.ceil(userDatas.length / itemsPerPage)}
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
                  "border  bg-[#075985] text-white rounded px-3 py-2 hover:bg-lightBlue-950"
                }
                disabledClassName={"opacity-110"}
              />
            </div> */}
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offers;
