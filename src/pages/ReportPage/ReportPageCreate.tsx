import React, { useState } from "react";
import Map, { NavigationControl, Marker, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate } from "react-router-dom";
import TextAreaInput from "../../components/universal/TextAreaInput";
import CustomAxios from "../../lib/actions/CustomAxios";
import { handleFetchError } from "../../lib/actions/HandleError";
import { IReportCategory } from "../../lib/types/ReportCategory";
import Button from "../../components/universal/Button";
import InputImage from "../../components/universal/InputImage";
import { IReportForm } from "../../lib/types/Report";
import { MAPBOX_TOKEN } from "../../lib/constant";
import useFetch from "../../lib/CustomHooks/useFetch";

const ReportPageCreate: React.FC = () => {
  const navigate = useNavigate();
  const { response: categories } = useFetch<IReportCategory[]>({
    url: "/categories",
  });
  const [viewport, setViewport] = useState<ViewState>({
    latitude: -6.256754465448308, // Default latitude
    longitude: 106.61895122539383, // Default longitude
    zoom: 12,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  const [formData, setFormData] = useState<IReportForm>({
    address: "",
    text: "",
    imgUrl: null,
    location: {
      lat: -6.256754465448308,
      lng: 106.61895122539383,
    },
    selectedFile: null,
    selectedCategory: "",
  });

  const handleSetLocation = () => {
    setFormData((prevData) => ({
      ...prevData,
      location: { lat: viewport.latitude, lng: viewport.longitude },
    }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFormData((prevData) => ({
        ...prevData,
        selectedFile: event.target.files?.length ? event.target.files[0] : null,
      }));
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      console.log({ formData });
    } catch (error) {
      handleFetchError(error);
    }
  };

  return (
    <div className="relative w-full grow pb-6 pt-20">
      <form
        onSubmit={onSubmit}
        className="mx-auto h-fit w-full max-w-[1000px] items-center justify-center rounded-lg bg-gray-50/10 pb-4 pt-2"
      >
        <div className="mb-5 mt-5 items-center justify-center px-4 text-center text-2xl font-bold text-black md:px-6">
          Report Page
        </div>
        <div className="relative flex h-[70vh] w-full justify-center rounded-lg">
          <Map
            {...viewport}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            onMove={(evt) => setViewport(evt.viewState)}
          >
            <NavigationControl position="top-left" />
            <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
              <div className="h-4 w-4 rounded-full border-2 border-white bg-red-500"></div>
            </Marker>
          </Map>
        </div>
        <div className="mt-4 flex flex-col items-center justify-center">
          <button
            onClick={handleSetLocation}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Set Location
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-6 px-4 md:px-6">
          <InputImage
            onChange={handleFileChange}
            file={formData.selectedFile}
          />
          <TextAreaInput
            name="address"
            label="Address"
            placeholder="Enter the address here..."
            value={formData.address}
            rows={2}
            onChange={handleInputChange}
          />
          <TextAreaInput
            name="text"
            label="Description"
            placeholder="Enter the description here..."
            value={formData.text}
            rows={4}
            onChange={handleInputChange}
          />
          <div className="mt-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.selectedCategory}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full items-center justify-center py-4">
            <Button className="w-full">Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportPageCreate;
