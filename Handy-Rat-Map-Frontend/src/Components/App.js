import React, { useEffect, useState } from "react";

import CompanyApi from "../CompanyApi";
import geocode from "../Decode_Api/geocode";
import Finder from "./CompanyFinderAPI/Finder";

import Map from "./Map";
import Spinner from "./Loading_Spinner";
import Pointer from "../Pointer/Pointer";
import AddButton from "../Pointer/AddBTN";
import Place_Definer from "../Place_Define/Place_Definer";
import CompanyCard from "./CompanyCard";

const App = () => {
  const [CurrentLng, setCurrentLng] = useState(null);
  const [CurrentLat, setCurrentLat] = useState(null);
  const [Address, setAddress] = useState("");
  const [DefinerVis, setDefinerVis] = useState(false);
  const [CompanyCreateState, setCompanyCreateState] = useState(0); //Not submit:0, submiting:1, Sucess:2, Fail:3
  const [DefinerMessage, setDefinerMessage] = useState(null);
  const [SurroundingCompany, setSurroundingCompany] = useState([]);
  const [Error, setError] = useState(null);
  const [CompanyCardState, setCompanyCardState] = useState(0);
  const [CompanyDisplayed, setCompanyDisplayed] = useState(
    {
      Lat: null,
      Lng: null,
      ShopName: null,
      ShopType: null,
      ShopDescription: null,
      Addr: null,
      _id: null,
      ImageSrc: []
    });



  const setMarkers = async () => {
    const Response = await Finder.get("/Company/SurroundingCompany", {
      params: {
        Lng: CurrentLng,
        Lat: CurrentLat
      }
    })
    console.log(`Response`);
    if (SurroundingCompany.length !== Response.data.length) {
      setSurroundingCompany(Response.data);
    }
  }

  useEffect(() => {
    if (DefinerVis === true) {
      setCompanyCreateState(1);
      const TimeoutID = setTimeout(() => {
        GetAndSetDetailAddress(CurrentLat, CurrentLng);
        setCompanyCreateState(0);
      }, 800);
      return () => {
        clearTimeout(TimeoutID);
      };
    }
  }, [CurrentLat, CurrentLng, DefinerVis])

  useEffect(() => {
    const TimeoutID = setTimeout(setMarkers, 200);
    return () => {
      clearTimeout(TimeoutID);
    };
  }, [CurrentLat, CurrentLng])

  useEffect(setMarkers, [])

  useEffect(() => { setPosition() }, [])



  const setPosition = () => {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        setCurrentLng(position.coords.longitude);
        setCurrentLat(position.coords.latitude);
      },
      err => {
        setError(err.message);
      }
    );
  };

  const OnMapCenterChange = (Lat, Lng) => {
    setCurrentLng(Lng);
    setCurrentLat(Lat);
  };

  const OnPlaceDefinerSubmit = async (ShopDetail) => {
    setCompanyCreateState(1);
    try {
      const response = await CompanyApi.post("/Company/CreateCompany", ShopDetail)
      setCompanyCreateState(2);
    } catch (err) {
      setCompanyCreateState(3);
      setDefinerMessage(err.message);
    }
    setTimeout(() => {
      setMarkers();
      setCompanyCreateState(0);
      setDefinerVis(false);
      console.log("closed");
    }, 2000);
  };

  const GetAndSetDetailAddress = async (Lat, Lng) => {
    const reponse = await geocode.get("", {
      params: {
        latlng: `${Lat},${Lng}`
      }
    });
    console.log(reponse.data.results[0].formatted_address.toString());

    setAddress(reponse.data.results[0].formatted_address.toString());
  };

  const AddItem = () => {
    setDefinerVis(true);
  };

  const OnMarkerClick = async (e) => {
    let CompanyClicked = {
      Lat: null,
      Lng: null,
      ShopName: null,
      ShopType: null,
      ShopDescription: null,
      Addr: null,
      _id: null,
      ImageSrc: [],
    };

    CompanyClicked.Lat = e.Lat;
    CompanyClicked.Lng = e.Lng;
    CompanyClicked.ShopName = e.ShopName;
    CompanyClicked.ShopType = e.ShopType;
    CompanyClicked.ShopDescription = e.ShopDescription;
    CompanyClicked.Addr = e.Addr;
    CompanyClicked._id = e._id;
    setCompanyCardState(1);
    setCompanyDisplayed(CompanyClicked);

    const Response = await Finder.get("/Company/GetCompanyImage",
      {
        params: {
          id: e._id
        }
      }
    )
    CompanyClicked.ImageSrc = Response.data.ImageSrc;
    setCompanyCardState(2);
    setCompanyDisplayed(CompanyClicked);
  }
  // console.log(CompanyClicked);
  const MapInitialize = () => {
    if (CurrentLng !== null && CurrentLat !== null) {
      // initialized
      return (
        <div>
          <CompanyCard
            Company={CompanyDisplayed}
            State={CompanyCardState}
            onClosed={() => {
              setCompanyCardState(0);
            }}
          />
          <Map
            Lat={CurrentLat}
            Lng={CurrentLng}
            OnCenterChange={OnMapCenterChange}
            Markers={SurroundingCompany}
            OnMarkerClick={OnMarkerClick}
          />
          <Pointer />
          <AddButton OnClick={AddItem} />
          <Place_Definer
            CompanyCreateState={CompanyCreateState}
            Address={Address}
            Lat={CurrentLat}
            Lng={CurrentLng}
            visible={DefinerVis}
            OnSumbit={OnPlaceDefinerSubmit}
            OnClosed={() => {
              setDefinerVis(false);
            }}
            message={DefinerMessage}
          />
        </div>
      );
    } else {
      return <Spinner message={Error} />;
    }
  };

  return MapInitialize();
};

export default App;
