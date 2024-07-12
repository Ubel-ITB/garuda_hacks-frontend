import React, { useState, useEffect, useContext } from "react";
import Map, { NavigationControl, Marker, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { NavLink, useNavigate } from "react-router-dom";
import TextAreaInput from "../../components/universal/TextAreaInput";
import CustomAxios from "../../lib/actions/CustomAxios";
import { handleFetchError } from "../../lib/actions/HandleError";
import { IReportCategory } from "../../lib/types/ReportCategory";
import { CurrentUserContext } from "../../lib/contexts/CurrentUserContext";
import { MAPBOX_TOKEN } from "../../lib/constant";
import useFetch from "../../lib/CustomHooks/useFetch";
import Button from "../../components/universal/Button";

const ReportPage = () => {
  const { data, loading } = useFetch({ url: "/categories" });
  const [viewport, setViewport] = useState<ViewState>({
    latitude: -6.121435, // Default latitude
    longitude: 106.774124, // Default longitude
    zoom: 12,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  return (
    <main className="relative flex h-fit grow flex-col pt-20">
      <div className="flex h-0 w-screen grow">
        <div className="w-0 grow">
          <Map
            {...viewport}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            onMove={(evt) => setViewport(evt.viewState)}
          >
            <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
              <div className="h-4 w-4 rounded-full border-2 border-white bg-red-500"></div>
            </Marker>
          </Map>
        </div>
        <div className="w-fit max-w-[300px] px-6">
          <div className="flex flex-col items-start">
            <div className="flex w-full items-center justify-between py-2">
              <h1 className="text-2xl font-bold">Report</h1>
              <NavLink to="/reports/create">
                <Button>Add</Button>
              </NavLink>
            </div>

            <section className="py-2">
              <h2>Filter By Categories</h2>
              <div className="flex flex-wrap">
                {JSON.stringify(data)}
                <NavLink to="?filter=jalanan-rusak" className="text-blue-500">
                  Jalanan rusak
                </NavLink>
                <NavLink to="?filter=sampah-menumpuk" className="text-red-500">
                  Sampah Menumpuk
                </NavLink>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportPage;
