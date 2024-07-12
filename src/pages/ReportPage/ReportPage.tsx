import { useState, useRef } from "react";
import Map, { NavigationControl, Marker, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { NavLink } from "react-router-dom";
import { IReportCategory } from "../../lib/types/ReportCategory";
import { IReport } from "../../lib/types/Report";
import { MAPBOX_TOKEN } from "../../lib/constant";
import useFetch from "../../lib/CustomHooks/useFetch";
import Button from "../../components/universal/Button";
import { IoLocation } from "react-icons/io5";

const ReportPage = () => {
  const { response: reports } = useFetch<IReport[]>({
    url: "/reports",
  });
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
  const [filterCategoryId, setFilterCategoryId] = useState("");
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const mapRef = useRef<mapboxgl.Map | null>(null);

  const filteredReports = !filterCategoryId
    ? reports
    : reports?.filter((el) => el.CategoryId === filterCategoryId);

  const handleSingleClick = (reportId: string) => {
    if (reportId === selectedReportId) {
      setSelectedReportId(null);
      // Zoom out the map
      console.log(10);
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [viewport.longitude, viewport.latitude],
          zoom: 12,
        });
      }
    } else {
      setSelectedReportId(reportId);
      console.log(15);
      const selectedReport = reports?.find((report) => report._id === reportId);
      if (selectedReport && mapRef.current) {
        mapRef.current.flyTo({
          center: [selectedReport.lng, selectedReport.lat],
          zoom: 15,
        });
      }
    }
  };

  return (
    <main className="relative flex h-fit grow flex-col pt-24">
      <div className="flex h-0 w-screen grow">
        <div className="w-0 grow">
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
                  color={selectedReportId === report._id ? "blue" : "red"}
                  className="h-auto w-12"
                />
              </Marker>
            ))}
          </Map>
        </div>
        <div className="w-fit min-w-[20vw] max-w-[300px] px-6">
          <div className="flex flex-col items-start">
            <div className="flex w-full items-center justify-between py-2">
              <h1 className="text-2xl font-bold">Report</h1>
              <NavLink to="/reports/create">
                <Button>Add</Button>
              </NavLink>
            </div>

            <section className="py-2">
              <h2>Filter By Categories</h2>
              <select
                onChange={(e) => setFilterCategoryId(e.target.value)}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            </section>

            <section className="w-full py-2 pt-6">
              <h2>Reports</h2>
              <div className="flex w-full flex-col items-stretch py-1">
                {filteredReports?.map((el) => (
                  <div
                    key={el._id}
                    onClick={() => handleSingleClick(el._id)}
                    className={`w-full cursor-pointer border-t-[1px] p-1 ${
                      selectedReportId === el._id
                        ? "bg-gray-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {el.text}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportPage;
