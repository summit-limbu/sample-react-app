import {Card, CardHeader, CardBody, CardFooter, Divider, Input, Button,} from "@nextui-org/react";
import { useState } from "react";

import { getSolarData } from "../api/actions";
  
const SolarCard: React.FC = () => {
  const [data, setData] = useState<SolarInfo | null>(null);
  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  
  const handleSearch = () => {
    setLoadingState(true);
    getSolarData(inputValue) 
      .then((res) => {
        setError("");
        setData(res); // Set the data received from the backend
        setLoadingState(false);
      })
      .catch((error) => {
        setError(error.message); // Display the error message
        setLoadingState(false);
        setData(null);
      });
  };  
  
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="bodyname"
              type="text"
              label="Celestial Object"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              className="custom-button" 
              isLoading={loadingState}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{data.englishName}</h1>
            <p className="text-lg">Is Planet: {data.isPlanet ? 'Yes' : 'No'}</p>
            <p className="text-lg">Gravity: {data.gravity}</p>
            <p className="text-lg">Mean Radius: {data.meanRadius}</p>
            <p className="text-lg">Average Temperature: {data.avgTemp}</p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Solar Sytem Data</p>
            <p className="text">Enter any solarsystem entity</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600">{error}</p>}
          {!data && !error && (
            <p className="text-xs text-gray-600">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default SolarCard;