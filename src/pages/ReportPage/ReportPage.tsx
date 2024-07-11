import React, { useState } from "react";
import Map, { NavigationControl, Marker, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import TextAreaInput from "../../components/universal/TextAreaInput";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWluZ3lhbjIxNCIsImEiOiJja2h4Y2xiajAwMTBsMnZuNHBzMjVmYjlsIn0.w7Wxvvi2i4olHVL2gE1zkQ"; // Add your Mapbox token here

const ReportPage: React.FC = () => {
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

  return (
    <div className="mx-auto h-fit w-[80%] items-center justify-center rounded-lg border border-black bg-purple-200 p-6">
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
      </div>
    </div>
  );
};

export default ReportPage;
