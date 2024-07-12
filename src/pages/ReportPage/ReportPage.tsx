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
import Modal from "../../components/universal/Modal";
import { IoLocation } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { CurrentUserContext } from "../../lib/contexts/CurrentUserContext";
import InputImage from "../../components/universal/InputImage";
import TextAreaInput from "../../components/universal/TextAreaInput";
import CustomAxios from "../../lib/actions/CustomAxios";
import { handleFetchError } from "../../lib/actions/HandleError";
import Swal from "sweetalert2";
import { FaShareAlt } from "react-icons/fa";
import { TiArrowRightThick } from "react-icons/ti";
import "intro.js/introjs.css";
import { Steps } from "intro.js-react";
import Select from "react-select";

const steps = [
  {
    element: "#add-button",
    intro: "Not happy with your neighbourhood condition? Add a report",
    position: "right",
  },
  {
    element: "#filter-category",
    intro: "Filter reports by category (Broken Lane, Unclean Location, etc)",
  },
  {
    element: "#filter-status",
    intro: "Filter by status (Reported, On Progress, Completed",
  },
  {
    element: "#reports-list",
    intro: "Lists of reports will be shown here",
  },
];

const options = {
  nextLabel: "Next",
  prevLabel: "Previous",
  doneLabel: "Complete Tour",
};

const ReportPage = () => {
  const navigate = useNavigate();
  const currentUserContext = useContext(CurrentUserContext);
  const { response: reports, refetch: refetchReports } = useFetch<IReport[]>({
    url: "/reports",
  });
  const { response: categories } = useFetch<IReportCategory[]>({
    url: "/categories",
  });
  const [viewport, setViewport] = useState<ViewState>({
    latitude: -6.256754465448308, // Default latitude
    longitude: 106.61895122539383, // Default longitude
    zoom: 15,
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
  const [stepsEnabled, setStepsEnabled] = useState(true);
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
          zoom: 17,
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
        refetchReports();
      }
      setIsModalOpen(false);
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

  const handleShareClick = async (
    reportId: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(
        `http://localhost:3000/reports/${reportId}`,
      );
      await CustomAxios("put", `/reports/${reportId}/share`);

      Swal.fire({
        title: "URL copied to clipboard and share count updated!",
        icon: "success",
      });

      await refetchReports();
    } catch (error) {
      handleFetchError(error);
    }
  };

  const categoryOptions = [
    { _id: "", name: "All" },
    ...(categories?.length ? categories : []),
  ].map((category) => ({
    value: category._id,
    label: category.name,
    name: category.name,
  }));

  const statusOptions = ["All", "Reported", "On Progress", "Finished"]?.map(
    (el) => ({
      value: el === "All" ? "" : el,
      label: el,
      name: el,
    }),
  );

  return (
    <main className="relative flex h-[160vh] grow flex-col pt-24 md:h-0">
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={0}
        onExit={() => setStepsEnabled(false)}
        options={options}
      />
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
            {filteredReports?.map((report) => (
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
                      : `${
                          report.status === "Reported" || !report.status
                            ? "red"
                            : ""
                        }${
                          report.status === "On Progress" ? "#FFBF00" : ""
                        }${report.status === "Finished" ? "green" : ""}`
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
              <NavLink to="/reports/create" id="add-button">
                <Button>Add</Button>
              </NavLink>
            </div>

            <section className="w-full py-2">
              <h2>Filter By Categories</h2>
              <Select
                id="filter-category"
                onChange={(option) => {
                  setFilterStatus("");
                  setFilterCategoryId(option?.value || "");
                  setSelectedReportId("");
                }}
                value={
                  categoryOptions?.find(
                    (option) => option.value === filterCategoryId,
                  ) || null
                }
                options={categoryOptions}
                className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </section>

            <section className="w-full py-2">
              <h2>Filter By Status</h2>
              <Select
                id="filter-status"
                onChange={(option) => {
                  setFilterStatus(option?.value || "");
                }}
                value={
                  statusOptions?.find(
                    (option) => option.value === filterStatus,
                  ) || null
                }
                options={statusOptions}
                className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </section>

            <section className="w-full py-2 pt-6">
              <h2 className="text-sm">Reports</h2>
              <div
                className="flex w-full flex-col items-stretch py-1"
                id="reports-list"
              >
                {filteredReports?.map((el) => (
                  <div
                    key={el._id}
                    onClick={() => handleSingleClick(el._id)}
                    className={`flex w-full cursor-pointer items-center border-t-[1px] p-1 ${
                      selectedReportId === el._id
                        ? "bg-gray-200"
                        : "hover:bg-gray-300"
                    }`}
                  >
                    <div className="flex w-full grow flex-col items-start justify-start text-wrap">
                      <div className="flex w-full flex-row items-center justify-between p-2">
                        <div className="flex items-center justify-center gap-2">
                          <div
                            className={twMerge(
                              `aspect-square h-auto w-4 rounded-full ${(el.status === "Reported" || !el.status) && "bg-red-700"}`,
                              `${el.status === "On Progress" && "bg-[#FFBF00]"}`,
                              `${el.status === "Finished" && "bg-green-700"}`,
                            )}
                          />
                          <p className="text-sm">{el.text}</p>
                        </div>
                      </div>
                      {el._id === selectedReportId && (
                        <div className="flex w-full flex-col items-start text-sm font-light text-slate-700">
                          <div className="w-full self-stretch">
                            <img
                              src={el.imgUrl as string}
                              alt=""
                              className="mx-auto h-[200px] self-stretch bg-slate-600/10 object-contain pb-2"
                            />
                          </div>
                          <p className="px-2 py-1">Progress: {el.status}</p>
                          {el.status !== "Reported" && (
                            <>
                              {el.status === "On Progress" && (
                                <p className="px-2">Work In Process...</p>
                              )}
                              <div className="w-full px-16 py-2">
                                <img
                                  src={el.progress.imgUrl}
                                  alt=""
                                  className="h-auto w-full bg-slate-600/10 object-contain"
                                />
                              </div>
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

                          <p className="mx-auto py-2 text-center font-light text-slate-600">
                            *Click again to close the detail*
                          </p>
                        </div>
                      )}
                    </div>
                    {el._id === selectedReportId ? (
                      <div className="flex w-fit max-w-fit flex-col items-center justify-start gap-6 self-stretch py-2 pr-2">
                        <button
                          className="flex flex-col items-center gap-1 hover:text-blue-500"
                          onClick={(event) => handleShareClick(el._id, event)}
                        >
                          <FaShareAlt size={19} />
                          <p className="text-xs">{el.totalshares}</p>
                        </button>
                        <div className="flex flex-col">
                          <button
                            className={`flex flex-col items-center justify-center gap-1 rounded-t-full border-[1px] ${el.UpvotedUserIds.includes(currentUserContext?.currentUser?._id as never) ? "border-blue-400 bg-blue-300 p-1 text-blue-600" : "border-blue-400 bg-blue-100 p-1 text-blue-600"}`}
                            onClick={async (e) => {
                              e.stopPropagation();
                              await CustomAxios(
                                "put",
                                `/reports/${el._id}/vote/upVote`,
                              );
                              await refetchReports();
                            }}
                          >
                            <TiArrowRightThick
                              size={20}
                              className="-rotate-90"
                            />
                            <p className="text-xs">
                              {el.UpvotedUserIds.length}
                            </p>
                          </button>
                          <button
                            className={`flex flex-col items-center justify-center gap-1 rounded-b-full border-[1px] ${el.DownVotedUserIds.includes(currentUserContext?.currentUser?._id as never) ? "border-red-400 bg-red-300 p-1 text-red-600" : "border-red-400 bg-red-100 p-1 text-red-600"}`}
                            onClick={async (e) => {
                              e.stopPropagation();
                              await CustomAxios(
                                "put",
                                `/reports/${el._id}/vote/downVote`,
                              );
                              await refetchReports();
                            }}
                          >
                            <TiArrowRightThick
                              size={20}
                              className="rotate-90"
                            />
                            <p className="text-xs">
                              {el.DownVotedUserIds.length}
                            </p>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="shrink-0 text-nowrap text-xs">
                        shares: {el.totalshares}
                      </p>
                    )}
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
