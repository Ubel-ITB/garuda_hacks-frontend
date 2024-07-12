/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, useContext } from "react";
import Map, { NavigationControl, Marker, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { NavLink, useNavigate } from "react-router-dom";
import { IReportCategory } from "../../lib/types/ReportCategory";
import { IReport, IReportProgressForm } from "../../lib/types/Report";
import { MAPBOX_TOKEN } from "../../lib/constant";
import useFetch from "../../lib/CustomHooks/useFetch";
import Button from "../../components/universal/Button";
import Modal from "../../components/universal/Modal"; // Import the Modal component
import { IoLocation } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { CurrentUserContext } from "../../lib/contexts/CurrentUserContext";
import InputImage from "../../components/universal/InputImage";
import TextAreaInput from "../../components/universal/TextAreaInput";
import CustomAxios from "../../lib/actions/CustomAxios";
import { handleFetchError } from "../../lib/actions/HandleError";
import Swal from "sweetalert2";

const ReportPage = () => {
  const navigate = useNavigate();
  const currentUserContext = useContext(CurrentUserContext);
  const { response: reports } = useFetch<IReport[]>({
    url: "/reports",
  });
  const { response: categories } = useFetch<IReportCategory[]>({
    url: "/categories",
  });
  const [viewport, setViewport] = useState<ViewState>({
    latitude: -6.256754465448308, // Default latitude
    longitude: 106.61895122539383, // Default longitude
    zoom: 13,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  const [filterCategoryId, setFilterCategoryId] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<IReportProgressForm>({
    text: "",
    imgUrl: "",
  });

  const mapRef = useRef<mapboxgl.Map | null>(null);

  const filteredReports = selectedReportId
    ? reports?.filter((el) => el._id === selectedReportId)
    : !filterCategoryId && !filterStatus
      ? reports
      : reports?.filter(
          (el) =>
            (!filterCategoryId || el.CategoryId === filterCategoryId) &&
            (!filterStatus || el.status === filterStatus),
        );

  const handleSingleClick = (reportId: string) => {
    if (reportId === selectedReportId) {
      setSelectedReportId(null);
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [viewport.longitude, viewport.latitude],
          zoom: 13,
        });
      }
    } else {
      setSelectedReportId(reportId);
      const selectedReport = reports?.find((report) => report._id === reportId);
      if (selectedReport && mapRef.current) {
        mapRef.current.flyTo({
          center: [selectedReport.lng, selectedReport.lat],
          zoom: 15,
        });
      }
    }
  };
  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleModalOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFinish = async () => {
    const updateData = {
      ...formData,
    };

    console.log(updateData);
    const response = await Swal.fire({
      title: "Are you sure to mark this done?",
      icon: "info",
      showCancelButton: true,
    });

    if (response.isConfirmed) {
      const { data } = await CustomAxios(
        "put",
        `/reports/${selectedReportId}/complete`,
        updateData,
      );

      if (data) {
        Swal.fire({
          title: "Finished successfully",
          icon: "success",
        });
        navigate("/reports");
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updateData = {
        ...formData,
      };

      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        const { data } = await CustomAxios(
          "post",
          `/uploads/progressPic/${currentUserContext?.currentUser?.username}`,
          fd,
        );
        updateData.imgUrl = data.url;
      }

      const result = await CustomAxios(
        "put",
        `/reports/${selectedReportId}`,
        updateData,
      );

      if (result) {
        Swal.fire({
          title: "Reported successfully",
          icon: "success",
        });
        navigate("/reports");
      }
    } catch (error) {
      handleFetchError(error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  return (
    <main className="relative flex h-[160vh] grow flex-col pt-24 md:h-0">
      <div className="flex h-[160vh] max-h-full w-screen grow flex-col md:flex-row">
        <div className="h-[60vh] w-full grow md:h-full md:w-0">
          <Map
            {...viewport}
            ref={(instance) => (mapRef.current = instance && instance.getMap())}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            onMove={(evt) => setViewport(evt.viewState)}
          >
            <NavigationControl position="top-left" />
            {reports?.map((report) => (
              <Marker
                key={report._id}
                latitude={report.lat}
                longitude={report.lng}
                onClick={() => handleSingleClick(report._id)}
              >
                <IoLocation
                  color={
                    selectedReportId === report._id
                      ? "blue"
                      : `${report.status === "Reported" || !report.status ? "red" : ""}${report.status === "On Progress" ? "#FFBF00" : ""}${report.status === "Finished" ? "green" : ""}`
                  }
                  className="h-auto w-8"
                />
              </Marker>
            ))}
          </Map>
        </div>
        <div className="h-[100vh] w-[100vw] overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 px-6 pb-10 pt-4 md:h-full md:w-[40%] md:max-w-[500px]">
          <div className="flex w-full flex-col items-start">
            <div className="flex w-full items-center justify-between py-2">
              <h1 className="text-xl font-bold sm:text-2xl">Report System</h1>
              <NavLink to="/reports/create">
                <Button>Add</Button>
              </NavLink>
            </div>

            <section className="w-full py-2">
              <h2>Filter By Categories</h2>
              <select
                onChange={(e) => {
                  setFilterStatus("");
                  setFilterCategoryId(e.target.value);
                  setSelectedReportId("");
                }}
                value={filterCategoryId}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All</option>
                {categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </section>

            <section className="w-full py-2">
              <h2>Filter By Status</h2>
              <select
                onChange={(e) => setFilterStatus(e.target.value)}
                value={filterStatus}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All</option>
                <option value="Reported">Reported</option>
                <option value="On Progress">On Progress</option>
                <option value="Finished">Finished</option>
              </select>
            </section>

            <section className="w-full py-2 pt-6">
              <h2 className="text-sm">Reports</h2>
              <div className="flex w-full flex-col items-stretch py-1">
                {filteredReports?.map((el) => (
                  <div
                    key={el._id}
                    onClick={() => handleSingleClick(el._id)}
                    className={`flex w-full cursor-pointer items-center border-t-[1px] p-1 ${
                      selectedReportId === el._id
                        ? "bg-gray-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex w-full grow flex-col items-start justify-start text-wrap">
                      <div className="flex items-center justify-center gap-2">
                        <div
                          className={twMerge(
                            `aspect-square h-auto w-4 rounded-full ${(el.status === "Reported" || !el.status) && "bg-red-700"}`,
                            `${el.status === "On Progress" && "bg-[#FFBF00]"}`,
                            `${el.status === "Finished" && "bg-green-700"}`,
                          )}
                        />
                        <p>{el.text}</p>
                      </div>
                      {el._id === selectedReportId && (
                        <div className="text-sm text-slate-900">
                          <img
                            src={el.imgUrl as string}
                            alt=""
                            className="h-[200px] w-full bg-slate-600/10 object-contain"
                          />
                          <p>Progress: {el.status}</p>
                          <p>Shares: {el.totalshares}</p>
                          <p>Upvotes: 0</p>
                          <p>Downvotes: 0</p>
                          {el.status !== "Reported" && (
                            <>
                              <img
                                src={el.progress.imgUrl}
                                alt=""
                                className="aspect-square h-auto w-full bg-slate-600/10 object-contain"
                              />
                              <p>Description: {el.progress.text}</p>
                            </>
                          )}
                          {(currentUserContext?.currentUser?.role ===
                            "officer" ||
                            currentUserContext?.currentUser?.role ===
                              "admin") &&
                            el.status === "Reported" && (
                              <Button
                                className="mt-2 w-fit py-1"
                                onClick={handleModalOpen}
                              >
                                Process
                              </Button>
                            )}
                          {(currentUserContext?.currentUser?.role ===
                            "officer" ||
                            currentUserContext?.currentUser?.role ===
                              "admin") &&
                            el.status === "On Progress" && (
                              <div className="flex flex-row gap-1 p-2">
                                <Button
                                  className="mt-2 w-fit py-1"
                                  onClick={handleModalOpen}
                                >
                                  Update
                                </Button>
                                <Button
                                  className="mt-2 w-fit py-1"
                                  onClick={handleFinish}
                                >
                                  Finish
                                </Button>
                              </div>
                            )}

                          <p className="py-2 text-center font-light text-slate-600">
                            *Click again to close the detail*
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <h2 className="text-2xl">Process this Report/issue</h2>
        <form action="" method="post" onSubmit={onSubmit}>
          <div className="py-4">
            <label htmlFor="file" className="h-fit">
              Progress Image
            </label>
            <InputImage file={file} onChange={handleFileChange} />
          </div>
          <div className="py-4">
            <label htmlFor="text" className="h-fit">
              Status
            </label>
            <label htmlFor="text" className="h-fit">
              Brief Explanation
            </label>
            <TextAreaInput
              name="text"
              value={formData.text}
              onChange={onChange}
            />
            <div className="flex w-full items-center justify-center py-4">
              <Button className="w-full">Submit</Button>
            </div>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default ReportPage;
