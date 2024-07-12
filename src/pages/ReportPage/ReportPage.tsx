import React, { useState, useEffect, useContext } from "react";
import Map, { NavigationControl, Marker, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate } from "react-router-dom";
import TextAreaInput from "../../components/universal/TextAreaInput";
import CustomAxios from "../../lib/actions/CustomAxios";
import { handleFetchError } from "../../lib/actions/HandleError";
import { IReportCategory } from "../../lib/types/ReportCategory";
import { CurrentUserContext } from "../../lib/contexts/CurrentUserContext";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWluZ3lhbjIxNCIsImEiOiJja2h4Y2xiajAwMTBsMnZuNHBzMjVmYjlsIn0.w7Wxvvi2i4olHVL2gE1zkQ"; // Add your Mapbox token here

const ReportPage: React.FC = () => {
  const navigate = useNavigate();
  const currentUserContext = useContext(CurrentUserContext);
  const [categories, setCategories] = useState<IReportCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await CustomAxios("get", "/categories");
        setCategories(data);
      } catch (error) {
        handleFetchError(error);
      }
    };

    fetchCategories();
  }, []);

  const [viewport, setViewport] = useState<ViewState>({
    latitude: -6.121435, // Default latitude
    longitude: 106.774124, // Default longitude
    zoom: 12,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  const [address, setAddress] = useState("");
  const [text, setText] = useState("");
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const handleSetLocation = () => {
    alert(`Latitude: ${viewport.latitude}, Longitude: ${viewport.longitude}`);
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
  };

  const handleTextChange = (value: string) => {
    setText(value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="relative grow pt-24">
      <div className="mx-auto h-fit w-[80%] items-center justify-center rounded-lg border border-black bg-blue-200 p-6">
        <div className="mb-5 mt-5 items-center justify-center text-center font-serif text-2xl font-bold text-black">
          Report Page
        </div>
        <div className="relative flex h-[500px] w-full justify-center rounded-lg p-4">
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
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSetLocation}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Set Location
          </button>
        </div>
        <div className="mt-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4 block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          />
          {imgUrl && (
            <div className="mb-4">
              <img
                src={imgUrl}
                alt="Uploaded"
                className="h-auto max-w-full rounded-lg"
              />
            </div>
          )}
          <TextAreaInput
            label="Address"
            placeholder="Enter the address here..."
            rows={2}
            onChange={handleAddressChange}
          />
          <TextAreaInput
            label="Description"
            placeholder="Enter the description here..."
            rows={4}
            onChange={handleTextChange}
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
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
